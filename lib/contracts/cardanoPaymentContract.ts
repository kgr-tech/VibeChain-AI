import { BlockfrostProvider, Transaction, Lucid, fromText, Data } from '@meshsdk/core';

// Cardano network configuration
const CARDANO_NETWORK = process.env.NEXT_PUBLIC_CARDANO_NETWORK || 'preprod';
const BLOCKFROST_API_KEY = process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || '';

// Contract address (update after deployment)
export const CARDANO_PAYMENT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CARDANO_CONTRACT_ADDRESS || '';

export interface CardanoPaymentData {
    paymentId: number;
    sender: string;
    recipient: string;
    amount: number; // in ADA
    timestamp: number;
    metadata: string;
    completed: boolean;
    txHash?: string;
}

export class CardanoPaymentContract {
    private lucid: Lucid | null = null;
    private provider: BlockfrostProvider;

    constructor() {
        this.provider = new BlockfrostProvider(BLOCKFROST_API_KEY);
    }

    /**
     * Initialize Lucid with wallet
     */
    async initialize(walletApi: any): Promise<void> {
        this.lucid = await Lucid.new(this.provider, CARDANO_NETWORK as any);
        this.lucid.selectWallet(walletApi);
    }

    /**
     * Create a new payment on Cardano
     */
    async createPayment(
        recipientAddress: string,
        amountInAda: number,
        metadata: string = ''
    ): Promise<{ paymentId: number; txHash: string }> {
        if (!this.lucid) {
            throw new Error('Lucid not initialized. Call initialize() first.');
        }

        try {
            const amountLovelace = BigInt(Math.floor(amountInAda * 1_000_000));

            // Generate payment ID (timestamp-based)
            const paymentId = Date.now();
            const timestamp = Math.floor(Date.now() / 1000);

            // Get sender address
            const senderAddress = await this.lucid.wallet.address();

            // Create payment datum
            const datum = Data.to({
                payment_id: BigInt(paymentId),
                sender: senderAddress,
                recipient: recipientAddress,
                amount: amountLovelace,
                timestamp: BigInt(timestamp),
                metadata: fromText(metadata),
                completed: false,
            });

            // Build transaction
            const tx = await this.lucid
                .newTx()
                .payToContract(
                    CARDANO_PAYMENT_CONTRACT_ADDRESS,
                    { inline: datum },
                    { lovelace: amountLovelace }
                )
                .complete();

            // Sign transaction
            const signedTx = await tx.sign().complete();

            // Submit transaction
            const txHash = await signedTx.submit();

            return {
                paymentId,
                txHash,
            };
        } catch (error: any) {
            console.error('Cardano payment creation error:', error);
            throw new Error(error.message || 'Failed to create Cardano payment');
        }
    }

    /**
     * Get payment details from UTxO
     */
    async getPayment(txHash: string, outputIndex: number = 0): Promise<CardanoPaymentData | null> {
        if (!this.lucid) {
            throw new Error('Lucid not initialized');
        }

        try {
            const utxos = await this.lucid.utxosAt(CARDANO_PAYMENT_CONTRACT_ADDRESS);

            const targetUtxo = utxos.find(
                utxo => utxo.txHash === txHash && utxo.outputIndex === outputIndex
            );

            if (!targetUtxo || !targetUtxo.datum) {
                return null;
            }

            const datum = Data.from(targetUtxo.datum);

            return {
                paymentId: Number(datum.payment_id),
                sender: datum.sender,
                recipient: datum.recipient,
                amount: Number(datum.amount) / 1_000_000, // Convert lovelace to ADA
                timestamp: Number(datum.timestamp),
                metadata: datum.metadata,
                completed: datum.completed,
                txHash,
            };
        } catch (error) {
            console.error('Get Cardano payment error:', error);
            return null;
        }
    }

    /**
     * Get all payments for a user
     */
    async getUserPayments(userAddress: string): Promise<CardanoPaymentData[]> {
        if (!this.lucid) {
            throw new Error('Lucid not initialized');
        }

        try {
            const utxos = await this.lucid.utxosAt(CARDANO_PAYMENT_CONTRACT_ADDRESS);
            const payments: CardanoPaymentData[] = [];

            for (const utxo of utxos) {
                if (!utxo.datum) continue;

                const datum = Data.from(utxo.datum);

                // Check if user is sender or recipient
                if (datum.sender === userAddress || datum.recipient === userAddress) {
                    payments.push({
                        paymentId: Number(datum.payment_id),
                        sender: datum.sender,
                        recipient: datum.recipient,
                        amount: Number(datum.amount) / 1_000_000,
                        timestamp: Number(datum.timestamp),
                        metadata: datum.metadata,
                        completed: datum.completed,
                        txHash: utxo.txHash,
                    });
                }
            }

            return payments.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('Get user Cardano payments error:', error);
            return [];
        }
    }

    /**
     * Complete a payment (mark as completed)
     */
    async completePayment(txHash: string, outputIndex: number = 0): Promise<string> {
        if (!this.lucid) {
            throw new Error('Lucid not initialized');
        }

        try {
            const utxos = await this.lucid.utxosAt(CARDANO_PAYMENT_CONTRACT_ADDRESS);

            const targetUtxo = utxos.find(
                utxo => utxo.txHash === txHash && utxo.outputIndex === outputIndex
            );

            if (!targetUtxo) {
                throw new Error('Payment UTxO not found');
            }

            const datum = Data.from(targetUtxo.datum!);

            // Create redeemer for completion
            const redeemer = Data.to({
                CompletePayment: {
                    payment_id: datum.payment_id,
                },
            });

            // Build completion transaction
            const tx = await this.lucid
                .newTx()
                .collectFrom([targetUtxo], redeemer)
                .complete();

            const signedTx = await tx.sign().complete();
            const completionTxHash = await signedTx.submit();

            return completionTxHash;
        } catch (error: any) {
            console.error('Complete Cardano payment error:', error);
            throw new Error(error.message || 'Failed to complete payment');
        }
    }

    /**
     * Estimate transaction fee
     */
    async estimateFee(amountInAda: number): Promise<number> {
        if (!this.lucid) {
            throw new Error('Lucid not initialized');
        }

        try {
            // Rough estimate: 0.17 ADA for standard transaction
            // Actual fee depends on transaction size and network conditions
            return 0.17;
        } catch (error) {
            console.error('Fee estimation error:', error);
            return 0.17; // Default estimate
        }
    }
}

/**
 * Convert ADA to Lovelace
 */
export function adaToLovelace(ada: number): bigint {
    return BigInt(Math.floor(ada * 1_000_000));
}

/**
 * Convert Lovelace to ADA
 */
export function lovelaceToAda(lovelace: bigint): number {
    return Number(lovelace) / 1_000_000;
}

/**
 * Format Cardano address for display
 */
export function formatCardanoAddress(address: string): string {
    if (!address) return '';
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
}

/**
 * Get Cardano explorer URL
 */
export function getCardanoExplorerUrl(txHash: string): string {
    const baseUrl = CARDANO_NETWORK === 'mainnet'
        ? 'https://cardanoscan.io'
        : 'https://preprod.cardanoscan.io';

    return `${baseUrl}/transaction/${txHash}`;
}
