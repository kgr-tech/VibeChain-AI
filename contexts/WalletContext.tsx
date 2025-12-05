'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

export type WalletType = 'metamask' | 'cardano' | null;

interface WalletContextType {
    walletType: WalletType;
    address: string | null;
    isConnected: boolean;
    isConnecting: boolean;
    connectMetaMask: () => Promise<void>;
    connectCardano: () => Promise<void>;
    disconnect: () => void;
    provider: BrowserProvider | null;
    signer: JsonRpcSigner | null;
    chainId: number | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [walletType, setWalletType] = useState<WalletType>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);

    const isConnected = !!address;

    // MetaMask connection
    const connectMetaMask = async () => {
        if (typeof window === 'undefined' || !window.ethereum) {
            alert('MetaMask is not installed. Please install MetaMask extension.');
            return;
        }

        setIsConnecting(true);
        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const browserProvider = new BrowserProvider(window.ethereum);
            const signer = await browserProvider.getSigner();
            const network = await browserProvider.getNetwork();

            setProvider(browserProvider);
            setSigner(signer);
            setAddress(accounts[0]);
            setWalletType('metamask');
            setChainId(Number(network.chainId));

            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnect();
                } else {
                    setAddress(accounts[0]);
                }
            });

            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });

        } catch (error) {
            console.error('MetaMask connection error:', error);
            alert('Failed to connect to MetaMask');
        } finally {
            setIsConnecting(false);
        }
    };

    // Cardano wallet connection
    const connectCardano = async () => {
        if (typeof window === 'undefined' || !window.cardano) {
            alert('No Cardano wallet detected. Please install Eternal, Nami, or another Cardano wallet.');
            return;
        }

        setIsConnecting(true);
        try {
            // Try Eternal wallet first, then fallback to other wallets
            const walletName = window.cardano.eternl ? 'eternl' :
                window.cardano.nami ? 'nami' :
                    window.cardano.flint ? 'flint' : null;

            if (!walletName) {
                alert('No supported Cardano wallet found');
                return;
            }

            const cardanoWallet = window.cardano[walletName];
            const api = await cardanoWallet.enable();

            // Get wallet address
            const usedAddresses = await api.getUsedAddresses();
            const addressHex = usedAddresses[0];

            setAddress(addressHex);
            setWalletType('cardano');

        } catch (error) {
            console.error('Cardano wallet connection error:', error);
            alert('Failed to connect to Cardano wallet');
        } finally {
            setIsConnecting(false);
        }
    };

    // Disconnect wallet
    const disconnect = () => {
        setWalletType(null);
        setAddress(null);
        setProvider(null);
        setSigner(null);
        setChainId(null);
    };

    // Check for existing connection on mount
    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts'
                    });
                    if (accounts.length > 0) {
                        await connectMetaMask();
                    }
                } catch (error) {
                    console.error('Error checking MetaMask connection:', error);
                }
            }
        };
        checkConnection();
    }, []);

    return (
        <WalletContext.Provider
            value={{
                walletType,
                address,
                isConnected,
                isConnecting,
                connectMetaMask,
                connectCardano,
                disconnect,
                provider,
                signer,
                chainId,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}

// Type declarations for window.ethereum and window.cardano
declare global {
    interface Window {
        ethereum?: any;
        cardano: any;
    }
}
