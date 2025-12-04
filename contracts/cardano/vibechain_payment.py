"""
Vibechain Payment Smart Contract
Written in OpShin (Python-like language for Cardano)

This contract enables:
- Payment processing on Cardano blockchain
- Payment record storage
- Event-like datum updates
- UTxO-based transaction handling
"""

from opshin.prelude import *


@dataclass
class PaymentDatum(PlutusData):
    """
    Datum structure for payment records
    Stored on-chain with each UTxO
    """
    CONSTR_ID = 0
    payment_id: int
    sender: PubKeyHash
    recipient: PubKeyHash
    amount: int  # in lovelace (1 ADA = 1,000,000 lovelace)
    timestamp: int  # POSIX timestamp
    metadata: bytes  # JSON encoded metadata
    completed: bool


@dataclass
class CreatePayment(PlutusData):
    """Redeemer for creating a new payment"""
    CONSTR_ID = 0
    recipient: PubKeyHash
    metadata: bytes


@dataclass
class CompletePayment(PlutusData):
    """Redeemer for marking payment as completed"""
    CONSTR_ID = 1
    payment_id: int


def validator(
    datum: PaymentDatum,
    redeemer: Union[CreatePayment, CompletePayment],
    context: ScriptContext
) -> None:
    """
    Main validator function
    
    Validates:
    - Payment creation with proper structure
    - Payment completion authorization
    - Proper UTxO handling
    """
    
    tx_info = context.tx_info
    
    # Get the spending transaction input
    own_input = None
    for tx_input in tx_info.inputs:
        if tx_input.out_ref == context.purpose.spending:
            own_input = tx_input
            break
    
    assert own_input is not None, "Own input not found"
    
    if isinstance(redeemer, CreatePayment):
        # Validate payment creation
        validate_payment_creation(datum, redeemer, tx_info)
    
    elif isinstance(redeemer, CompletePayment):
        # Validate payment completion
        validate_payment_completion(datum, redeemer, tx_info)
    
    else:
        assert False, "Invalid redeemer type"


def validate_payment_creation(
    datum: PaymentDatum,
    redeemer: CreatePayment,
    tx_info: TxInfo
) -> None:
    """
    Validate payment creation
    
    Checks:
    - Sender signed the transaction
    - Amount is positive
    - Recipient matches redeemer
    - Datum is properly structured
    """
    
    # Ensure sender signed the transaction
    assert datum.sender in tx_info.signatories, "Sender must sign transaction"
    
    # Validate amount
    assert datum.amount > 0, "Payment amount must be positive"
    
    # Validate recipient matches
    assert datum.recipient == redeemer.recipient, "Recipient mismatch"
    
    # Validate metadata
    assert datum.metadata == redeemer.metadata, "Metadata mismatch"
    
    # Ensure payment is not already completed
    assert not datum.completed, "Payment already completed"
    
    # Validate timestamp is reasonable (within 1 hour of validity range)
    validity_range = tx_info.valid_range
    assert datum.timestamp >= validity_range.lower_bound.time, "Timestamp too old"
    assert datum.timestamp <= validity_range.upper_bound.time + 3600000, "Timestamp too far in future"


def validate_payment_completion(
    datum: PaymentDatum,
    redeemer: CompletePayment,
    tx_info: TxInfo
) -> None:
    """
    Validate payment completion
    
    Checks:
    - Payment ID matches
    - Recipient or sender signed
    - Payment not already completed
    """
    
    # Validate payment ID
    assert datum.payment_id == redeemer.payment_id, "Payment ID mismatch"
    
    # Either sender or recipient can complete
    assert (
        datum.sender in tx_info.signatories or
        datum.recipient in tx_info.signatories
    ), "Must be signed by sender or recipient"
    
    # Ensure payment was not already completed
    assert not datum.completed, "Payment already completed"


@dataclass
class PaymentRecord(PlutusData):
    """
    Helper structure for payment records
    Used for querying and off-chain processing
    """
    CONSTR_ID = 2
    payment_id: int
    sender: PubKeyHash
    recipient: PubKeyHash
    amount: int
    timestamp: int
    metadata: bytes
    completed: bool
    tx_hash: bytes


# Helper functions for off-chain code

def create_payment_datum(
    payment_id: int,
    sender: PubKeyHash,
    recipient: PubKeyHash,
    amount: int,
    timestamp: int,
    metadata: bytes
) -> PaymentDatum:
    """
    Create a new payment datum
    
    Args:
        payment_id: Unique payment identifier
        sender: Public key hash of sender
        recipient: Public key hash of recipient
        amount: Payment amount in lovelace
        timestamp: POSIX timestamp
        metadata: JSON encoded metadata
    
    Returns:
        PaymentDatum object
    """
    return PaymentDatum(
        payment_id=payment_id,
        sender=sender,
        recipient=recipient,
        amount=amount,
        timestamp=timestamp,
        metadata=metadata,
        completed=False
    )


def encode_metadata(note: str, extra_data: dict = None) -> bytes:
    """
    Encode payment metadata as bytes
    
    Args:
        note: Payment note/description
        extra_data: Additional metadata dictionary
    
    Returns:
        Encoded metadata bytes
    """
    import json
    
    metadata = {
        "note": note,
        "version": "1.0",
    }
    
    if extra_data:
        metadata.update(extra_data)
    
    return json.dumps(metadata).encode('utf-8')


# Deployment notes:
#
# 1. Compile this contract using OpShin compiler:
#    opshin build spending vibechain_payment.py
#
# 2. Deploy to Cardano testnet (Preprod):
#    cardano-cli transaction build \
#      --tx-in <utxo> \
#      --tx-out <script_address>+<amount> \
#      --tx-out-inline-datum-file payment_datum.json \
#      --change-address <your_address> \
#      --testnet-magic 1 \
#      --out-file tx.raw
#
# 3. Sign and submit:
#    cardano-cli transaction sign \
#      --tx-body-file tx.raw \
#      --signing-key-file payment.skey \
#      --testnet-magic 1 \
#      --out-file tx.signed
#
#    cardano-cli transaction submit \
#      --testnet-magic 1 \
#      --tx-file tx.signed
#
# 4. Query UTxOs at script address:
#    cardano-cli query utxo \
#      --address <script_address> \
#      --testnet-magic 1
