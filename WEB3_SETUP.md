# Web3 DApp Features - Setup Guide

This guide covers the setup and deployment of the blockchain features including wallet connectivity, smart contract payments, QR code receipts, and the AI chatbot.

## Features Overview

### 1. Wallet Integration
- **MetaMask**: Connect to Ethereum and EVM-compatible chains
- **Cardano Wallets**: Support for Eternal, Nami, and Flint wallets
- Automatic wallet detection and connection
- Network switching and account management

### 2. Smart Contract Payments
- On-chain payment processing
- Event-driven receipt generation
- Transaction verification
- Gas estimation

### 3. QR Code Receipts
- Automatic QR code generation after payment
- Downloadable and printable receipts
- Blockchain explorer integration
- Holographic visual effects

### 4. AI Chatbot (Gemini-Powered)
- Natural language payment processing
- Payment intent detection
- Conversational interface
- Chat-to-pay functionality

## Prerequisites

1. **Node.js 18+** and npm
2. **MetaMask** browser extension
3. **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
4. **Ethereum Testnet ETH** (Sepolia) for testing
5. **Supabase Account** (already configured)

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `ethers` - Ethereum library
- `@meshsdk/core` & `@meshsdk/react` - Cardano integration
- `qrcode.react` - QR code generation
- `@google/generative-ai` - Gemini AI SDK

### 2. Environment Variables

Copy the example file:
```bash
copy .env.local.example .env.local
```

Edit `.env.local` and add:

```env
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# Smart Contract (update after deployment)
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0x...
```

#### Getting a Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your `.env.local`

### 3. Deploy Smart Contract

#### Option A: Using Remix IDE (Recommended for Testing)

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `VibechainPayment.sol`
3. Copy the contract code from `contracts/VibechainPayment.sol`
4. Compile the contract (Solidity 0.8.20)
5. Deploy to Sepolia testnet:
   - Connect MetaMask to Sepolia
   - Select "Injected Provider - MetaMask"
   - Click "Deploy"
6. Copy the deployed contract address
7. Update `.env.local` with the address

#### Option B: Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat init

# Copy contract to contracts/ folder
# Configure hardhat.config.js with Sepolia network

# Deploy
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Get Testnet ETH

For Sepolia testnet:
- [Sepolia Faucet 1](https://sepoliafaucet.com/)
- [Sepolia Faucet 2](https://www.alchemy.com/faucets/ethereum-sepolia)

## Usage

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Testing Wallet Connection

1. Navigate to any page
2. Click "Connect Wallet" in the header
3. Select MetaMask or Cardano wallet
4. Approve the connection
5. Your wallet address will appear in the header

### Making a Payment

#### Method 1: Payment Page

1. Go to `/payments`
2. Enter recipient address (0x...)
3. Enter amount in ETH
4. Add optional note
5. Click "Send Payment"
6. Confirm in MetaMask
7. View generated receipt with QR code

#### Method 2: Chat-to-Pay

1. Click the chat button (bottom-right)
2. Type a payment command, e.g.:
   - "Send 0.1 ETH to 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
   - "Pay 0.05 ETH to 0x123..."
3. The AI will detect the payment intent
4. Confirm the payment
5. Receipt generated automatically

### QR Code Receipts

After a successful payment:
- QR code is automatically generated
- Contains payment data (ID, amount, addresses, timestamp)
- Can be downloaded as PNG
- Can be printed
- Links to blockchain explorer for verification

## Smart Contract Functions

### createPayment
```solidity
function createPayment(address _to, string memory _metadata) public payable returns (uint256)
```
Creates a payment and returns payment ID.

### getPayment
```solidity
function getPayment(uint256 _paymentId) public view returns (...)
```
Retrieves payment details by ID.

### getUserPayments
```solidity
function getUserPayments(address _user) public view returns (uint256[] memory)
```
Gets all payment IDs for a user.

## Troubleshooting

### MetaMask Not Detected
- Ensure MetaMask extension is installed
- Refresh the page
- Check browser console for errors

### Transaction Fails
- Ensure you have enough ETH for gas fees
- Check you're on the correct network (Sepolia)
- Verify contract address is correct

### Chatbot Not Responding
- Verify Gemini API key is set correctly
- Check API key has not exceeded quota
- Look for errors in browser console

### QR Code Not Generating
- Ensure payment completed successfully
- Check transaction was confirmed on blockchain
- Verify payment ID was returned

## Network Configuration

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/YOUR-PROJECT-ID
- **Explorer**: https://sepolia.etherscan.io

### Adding Sepolia to MetaMask
1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Enter Sepolia details
5. Save

## Security Notes

⚠️ **Important**:
- Never commit `.env.local` to version control
- Use testnet for development
- Audit smart contracts before mainnet deployment
- Keep private keys secure
- Test thoroughly before using real funds

## Production Deployment

### 1. Deploy to Mainnet

- Get mainnet ETH
- Deploy contract to Ethereum mainnet
- Update contract address in environment variables
- Thorough security audit recommended

### 2. Deploy to Vercel

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GEMINI_API_KEY`
- `NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS`

## API Costs

### Gemini AI
- Free tier: 60 requests per minute
- Paid tier: Higher limits
- Monitor usage in Google Cloud Console

### Ethereum Gas Fees
- Testnet: Free (faucet ETH)
- Mainnet: Variable (check gas prices)
- Optimize contract calls to reduce costs

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure wallet is connected to correct network
4. Check smart contract is deployed correctly

## Next Steps

- [ ] Deploy smart contract to testnet
- [ ] Get Gemini API key
- [ ] Test wallet connections
- [ ] Make test payments
- [ ] Try chat-to-pay feature
- [ ] Customize receipt design
- [ ] Add more payment tokens (ERC-20)
- [ ] Implement payment history page
- [ ] Add transaction notifications

## License

MIT
