'use client';

import { BlockfrostProvider, MeshTxBuilder } from '@meshsdk/core';

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

// Browser wallet API interface
interface BrowserWalletApi {
    getUsedAddresses(): Promise<string[]>;
    getUtxos(): Promise<string[]>;
    signTx(tx: string, partialSign?: boolean): Promise<string>;
    submitTx(tx: string): Promise<string>;
    getBalance(): Promise<string>;
}

export class CardanoPaymentContract {
    private walletApi: BrowserWalletApi | null = null;
    private provider: BlockfrostProvider;

    constructor() {
        // BlockfrostProvider only takes the API key - network is determined by the key prefix
        this.provider = new BlockfrostProvider(BLOCKFROST_API_KEY);
    }

    /**
     * Initialize with browser wallet API (from window.cardano.walletName.enable())
     */
    async initialize(walletApi: BrowserWalletApi): Promise<void> {
        this.walletApi = walletApi;
    }

    /**
     * Get connected wallet address
     */
    async getWalletAddress(): Promise<string> {
        if (!this.walletApi) {
            throw new Error('Wallet not initialized');
        }
        const addresses = await this.walletApi.getUsedAddresses();
        return addresses[0] || '';
    }

    /**
     * Create a new payment on Cardano (simple transfer)
     */
    async createPayment(
        recipientAddress: string,
        amountInAda: number,
        _metadata: string = ''
    ): Promise<{ paymentId: number; txHash: string }> {
        if (!this.walletApi) {
            throw new Error('Wallet not initialized. Call initialize() first.');
        }

        try {
            const amountLovelace = Math.floor(amountInAda * 1_000_000).toString();

            // Generate payment ID (timestamp-based)
            const paymentId = Date.now();

            // Build transaction using MeshTxBuilder
            const txBuilder = new MeshTxBuilder({
                fetcher: this.provider,
                submitter: this.provider,
            });

            const senderAddress = await this.getWalletAddress();
            const utxos = await this.provider.fetchAddressUTxOs(senderAddress);

            // Build the transaction
            await txBuilder
                .txOut(recipientAddress, [{ unit: 'lovelace', quantity: amountLovelace }])
                .changeAddress(senderAddress)
                .selectUtxosFrom(utxos)
                .complete();

            // Sign with wallet
            const unsignedTx = txBuilder.txHex;
            const signedTx = await this.walletApi.signTx(unsignedTx);

            // Submit transaction
            const txHash = await this.walletApi.submitTx(signedTx);

            return {
                paymentId,
                txHash,
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create Cardano payment';
            console.error('Cardano payment creation error:', error);
            throw new Error(errorMessage);
        }
    }

    /**
     * Get transaction details (simplified - returns basic info)
     */
    async getPayment(txHash: string): Promise<CardanoPaymentData | null> {
        try {
            // Blockfrost API to get transaction details
            const response = await fetch(
                `${CARDANO_NETWORK === 'mainnet'
                    ? 'https://cardano-mainnet.blockfrost.io/api/v0'
                    : 'https://cardano-preprod.blockfrost.io/api/v0'}/txs/${txHash}`,
                {
                    headers: {
                        'project_id': BLOCKFROST_API_KEY
                    }
                }
            );

            if (!response.ok) {
                return null;
            }

            const txData = await response.json();

            return {
                paymentId: 0, // Not available from chain
                sender: '', // Would need to parse inputs
                recipient: '', // Would need to parse outputs
                amount: 0, // Would need to parse outputs
                timestamp: txData.block_time || 0,
                metadata: '',
                completed: true,
                txHash,
            };
        } catch (error) {
            console.error('Get Cardano payment error:', error);
            return null;
        }
    }

    /**
     * Get wallet balance in ADA
     */
    async getBalance(): Promise<number> {
        if (!this.walletApi) {
            throw new Error('Wallet not initialized');
        }

        try {
            const balanceHex = await this.walletApi.getBalance();
            // Balance is returned as CBOR hex, parse the lovelace value
            // For simplicity, we'll use the provider to get balance
            const address = await this.getWalletAddress();
            const utxos = await this.provider.fetchAddressUTxOs(address);

            let totalLovelace = 0;
            for (const utxo of utxos) {
                const lovelace = utxo.output.amount.find((a: { unit: string; quantity: string }) => a.unit === 'lovelace');
                if (lovelace) {
                    totalLovelace += Number(lovelace.quantity);
                }
            }

            return totalLovelace / 1_000_000;
        } catch (error) {
            console.error('Get balance error:', error);
            return 0;
        }
    }

    /**
     * Estimate transaction fee
     */
    async estimateFee(_amountInAda: number): Promise<number> {
        // Rough estimate: 0.17 ADA for standard transaction
        // Actual fee depends on transaction size and network conditions
        return 0.17;
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
