# OpShin Payment Contract - Deployment Guide

## Overview

This guide covers deploying and using the Vibechain payment smart contract written in **OpShin** (Python-based language) for the Cardano blockchain.

## Prerequisites

1. **OpShin Compiler**:
   ```bash
   pip install opshin
   ```

2. **Cardano CLI** (for deployment):
   ```bash
   # Download and install from:
   # https://github.com/input-output-hk/cardano-node/releases
   ```

3. **Blockfrost API Key**:
   - Sign up at https://blockfrost.io
   - Create a project for Preprod testnet
   - Copy your API key

4. **Test ADA**:
   - Get from Cardano Preprod faucet
   - https://docs.cardano.org/cardano-testnet/tools/faucet/

## Contract Features

### OpShin Smart Contract (`vibechain_payment.py`)

- **Payment Creation**: Create on-chain payment records
- **Datum Storage**: Store payment details in UTxO datum
- **Validation**: Ensure proper authorization and data integrity
- **Completion Tracking**: Mark payments as completed
- **Metadata Support**: Store JSON-encoded payment notes

### Payment Datum Structure

```python
@dataclass
class PaymentDatum:
    payment_id: int          # Unique identifier
    sender: PubKeyHash       # Sender's public key hash
    recipient: PubKeyHash    # Recipient's public key hash
    amount: int              # Amount in lovelace
    timestamp: int           # POSIX timestamp
    metadata: bytes          # JSON metadata
    completed: bool          # Completion status
```

## Compilation

### 1. Compile OpShin Contract

```bash
cd contracts/cardano

# Compile the contract
opshin build spending vibechain_payment.py

# This generates:
# - vibechain_payment.plutus (Plutus script)
# - vibechain_payment.cbor (CBOR encoded)
# - vibechain_payment.addr (Script address)
```

### 2. Get Script Address

```bash
# The script address will be in vibechain_payment.addr
cat vibechain_payment.addr

# Example output:
# addr_test1wz...
```

## Deployment to Preprod Testnet

### 1. Set Up Cardano CLI

```bash
# Set network magic (1 = Preprod, 2 = Preview)
export CARDANO_NODE_SOCKET_PATH=/path/to/node.socket
export NETWORK="--testnet-magic 1"

# Check your wallet balance
cardano-cli query utxo \
  --address $(cat payment.addr) \
  $NETWORK
```

### 2. Create Initial UTxO at Script

```bash
# Create a datum file
cat > payment_datum.json <<EOF
{
  "constructor": 0,
  "fields": [
    {"int": 1},
    {"bytes": "YOUR_SENDER_PKH"},
    {"bytes": "YOUR_RECIPIENT_PKH"},
    {"int": 10000000},
    {"int": $(date +%s)},
    {"bytes": "7b226e6f7465223a2274657374227d"},
    {"constructor": 1, "fields": []}
  ]
}
EOF

# Build transaction to lock funds at script
cardano-cli transaction build \
  --tx-in <YOUR_UTXO> \
  --tx-out $(cat vibechain_payment.addr)+10000000 \
  --tx-out-inline-datum-file payment_datum.json \
  --change-address $(cat payment.addr) \
  $NETWORK \
  --out-file tx.raw

# Sign transaction
cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file payment.skey \
  $NETWORK \
  --out-file tx.signed

# Submit transaction
cardano-cli transaction submit \
  $NETWORK \
  --tx-file tx.signed
```

### 3. Update Environment Variables

Add to `.env.local`:

```env
# Cardano Configuration
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_BLOCKFROST_API_KEY=your-blockfrost-api-key
NEXT_PUBLIC_CARDANO_CONTRACT_ADDRESS=addr_test1wz...
```

## Using the Contract

### Frontend Integration

```typescript
import { CardanoPaymentContract } from '@/lib/contracts/cardanoPaymentContract';

// Initialize with Eternal/Nami wallet
const contract = new CardanoPaymentContract();
await contract.initialize(window.cardano.eternl);

// Create payment
const { paymentId, txHash } = await contract.createPayment(
  'addr_test1...recipient',
  10.5, // 10.5 ADA
  'Payment for services'
);

// Get payment details
const payment = await contract.getPayment(txHash);

// Get user's payments
const payments = await contract.getUserPayments(userAddress);
```

### Chatbot Integration

The chatbot will automatically detect Cardano payments:

```
User: "Send 10 ADA to addr_test1..."
Bot: Detects Cardano address format
     → Uses CardanoPaymentContract
     → Shows verification dialog
     → Executes payment on Cardano
```

## Testing

### 1. Test Payment Creation

```bash
# Using Cardano CLI
cardano-cli transaction build \
  --tx-in <YOUR_UTXO> \
  --tx-out <SCRIPT_ADDR>+10000000 \
  --tx-out-inline-datum-file test_datum.json \
  --change-address <YOUR_ADDR> \
  $NETWORK \
  --out-file test_tx.raw

cardano-cli transaction sign \
  --tx-body-file test_tx.raw \
  --signing-key-file payment.skey \
  $NETWORK \
  --out-file test_tx.signed

cardano-cli transaction submit \
  $NETWORK \
  --tx-file test_tx.signed
```

### 2. Query UTxOs

```bash
# Check script UTxOs
cardano-cli query utxo \
  --address $(cat vibechain_payment.addr) \
  $NETWORK

# Should show payment UTxOs with inline datums
```

### 3. Test in Application

1. Connect Eternal Wallet
2. Navigate to Payments page
3. Enter Cardano address (starts with `addr_test1...`)
4. Enter amount in ADA
5. Click "Send Payment"
6. Confirm in wallet
7. View receipt with Cardano explorer link

## Dual-Chain Support

### Automatic Chain Detection

```typescript
function detectBlockchain(address: string): 'ethereum' | 'cardano' {
  if (address.startsWith('0x')) {
    return 'ethereum';
  } else if (address.startsWith('addr')) {
    return 'cardano';
  }
  throw new Error('Unknown address format');
}
```

### Payment Processor Updates

The payment processor automatically routes to the correct chain:

- **Ethereum addresses** (`0x...`) → Solidity contract
- **Cardano addresses** (`addr...`) → OpShin contract

## OpShin vs Solidity Comparison

| Feature | Solidity (Ethereum) | OpShin (Cardano) |
|---------|---------------------|------------------|
| Language | JavaScript-like | Python-like |
| Model | Account-based | UTxO-based |
| Data Storage | State variables | Datum in UTxO |
| Events | Event emission | Datum updates |
| Gas | Variable gas fees | Fixed transaction fees |
| Finality | 12 confirmations | 5 confirmations |

## Advantages of OpShin/Cardano

1. **Deterministic Fees**: Transaction costs are predictable
2. **Python Syntax**: Easier for Python developers
3. **Formal Verification**: Better security guarantees
4. **Energy Efficient**: Proof of Stake consensus
5. **Native Tokens**: Built-in multi-asset support

## Troubleshooting

### "Script validation failed"
- Check datum structure matches contract
- Ensure redeemer is correct type
- Verify all required signatures present

### "Insufficient collateral"
- Set collateral UTxO in wallet
- Minimum 5 ADA recommended

### "Transaction too large"
- Reduce metadata size
- Split into multiple transactions

## Security Notes

> [!IMPORTANT]
> **Testnet Only**: Always test on Preprod/Preview first

> [!WARNING]
> **Datum Security**: Datums are public, don't store sensitive data

> [!CAUTION]
> **Script Audit**: Have contract audited before mainnet deployment

## Resources

- **OpShin Documentation**: https://github.com/OpShin/opshin
- **Cardano Docs**: https://docs.cardano.org
- **Mesh SDK**: https://meshjs.dev
- **Blockfrost**: https://blockfrost.io
- **Cardano Explorer**: https://preprod.cardanoscan.io

## Mainnet Deployment

When ready for production:

1. Audit OpShin contract
2. Test extensively on Preprod
3. Compile for mainnet
4. Deploy to mainnet
5. Update `NEXT_PUBLIC_CARDANO_NETWORK=mainnet`
6. Use mainnet Blockfrost API key
7. Verify on Cardanoscan.io

## Next Steps

- [ ] Compile OpShin contract
- [ ] Deploy to Preprod testnet
- [ ] Get Blockfrost API key
- [ ] Update environment variables
- [ ] Test with Eternal Wallet
- [ ] Verify dual-chain support
- [ ] Test chat-to-pay with Cardano addresses
