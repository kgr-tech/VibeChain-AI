// Global type declarations for wallet APIs
// This file consolidates all window interface extensions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

declare global {
    interface Window {
        // MetaMask / Ethereum provider
        ethereum?: {
            request: (args: { method: string; params?: unknown[] }) => Promise<any>;
            on: (event: string, callback: AnyFunction) => void;
            removeListener: (event: string, callback: AnyFunction) => void;
            isMetaMask?: boolean;
        };
        // Cardano wallet providers (Eternl, Nami, Flint, etc.)
        cardano?: {
            eternl?: any;
            nami?: any;
            flint?: any;
            [key: string]: any;
        };
    }
}

// This is needed to make this file a module
export { };
