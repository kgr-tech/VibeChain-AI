import { Contract, BrowserProvider, parseEther, formatEther } from 'ethers';

// Contract ABI - only the functions we need
export const PAYMENT_CONTRACT_ABI = [
    "function createPayment(address _to, string memory _metadata) public payable returns (uint256)",
    "function getPayment(uint256 _paymentId) public view returns (address from, address to, uint256 amount, uint256 timestamp, string memory metadata, bool completed)",
    "function getUserPayments(address _user) public view returns (uint256[] memory)",
    "function getTotalPayments() public view returns (uint256)",
    "event PaymentCreated(uint256 indexed paymentId, address indexed from, address indexed to, uint256 amount, uint256 timestamp, string metadata)",
    "event PaymentCompleted(uint256 indexed paymentId, address indexed from, uint256 amount)"
];

// Contract address - Update this after deployment
// For Sepolia testnet - deploy using Hardhat or Remix
export const PAYMENT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export interface PaymentData {
    paymentId: number;
    from: string;
    to: string;
    amount: string;
    timestamp: number;
    metadata: string;
    completed: boolean;
    transactionHash?: string;
}

export class PaymentContract {
    private contract: Contract;
    private provider: BrowserProvider;

    constructor(provider: BrowserProvider, signer: any) {
        this.provider = provider;
        this.contract = new Contract(PAYMENT_CONTRACT_ADDRESS, PAYMENT_CONTRACT_ABI, signer);
    }

    /**
     * Create a new payment
     */
    async createPayment(
        recipientAddress: string,
        amountInEth: string,
        metadata: string = ''
    ): Promise<{ paymentId: number; transactionHash: string }> {
        try {
            const tx = await this.contract.createPayment(recipientAddress, metadata, {
                value: parseEther(amountInEth),
            });

            const receipt = await tx.wait();

            // Extract payment ID from event logs
            const event = receipt.logs.find((log: any) => {
                try {
                    const parsed = this.contract.interface.parseLog(log);
                    return parsed?.name === 'PaymentCreated';
                } catch {
                    return false;
                }
            });

            let paymentId = 0;
            if (event) {
                const parsed = this.contract.interface.parseLog(event);
                paymentId = Number(parsed?.args[0] || 0);
            }

            return {
                paymentId,
                transactionHash: receipt.hash,
            };
        } catch (error: any) {
            console.error('Payment creation error:', error);
            throw new Error(error.message || 'Failed to create payment');
        }
    }

    /**
     * Get payment details by ID
     */
    async getPayment(paymentId: number): Promise<PaymentData> {
        try {
            const payment = await this.contract.getPayment(paymentId);

            return {
                paymentId,
                from: payment[0],
                to: payment[1],
                amount: formatEther(payment[2]),
                timestamp: Number(payment[3]),
                metadata: payment[4],
                completed: payment[5],
            };
        } catch (error: any) {
            console.error('Get payment error:', error);
            throw new Error('Failed to fetch payment details');
        }
    }

    /**
     * Get all payment IDs for a user
     */
    async getUserPayments(userAddress: string): Promise<number[]> {
        try {
            const paymentIds = await this.contract.getUserPayments(userAddress);
            return paymentIds.map((id: bigint) => Number(id));
        } catch (error: any) {
            console.error('Get user payments error:', error);
            return [];
        }
    }

    /**
     * Get total number of payments
     */
    async getTotalPayments(): Promise<number> {
        try {
            const total = await this.contract.getTotalPayments();
            return Number(total);
        } catch (error: any) {
            console.error('Get total payments error:', error);
            return 0;
        }
    }

    /**
     * Listen for payment events
     */
    onPaymentCreated(callback: (event: any) => void) {
        this.contract.on('PaymentCreated', (paymentId, from, to, amount, timestamp, metadata) => {
            callback({
                paymentId: Number(paymentId),
                from,
                to,
                amount: formatEther(amount),
                timestamp: Number(timestamp),
                metadata,
            });
        });
    }

    /**
     * Remove event listeners
     */
    removeAllListeners() {
        this.contract.removeAllListeners();
    }
}

/**
 * Estimate gas for a payment
 */
export async function estimatePaymentGas(
    provider: BrowserProvider,
    signer: any,
    recipientAddress: string,
    amountInEth: string
): Promise<string> {
    try {
        const contract = new Contract(PAYMENT_CONTRACT_ADDRESS, PAYMENT_CONTRACT_ABI, signer);
        const gasEstimate = await contract.createPayment.estimateGas(
            recipientAddress,
            '',
            { value: parseEther(amountInEth) }
        );

        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice || BigInt(0);
        const gasCost = gasEstimate * gasPrice;

        return formatEther(gasCost);
    } catch (error) {
        console.error('Gas estimation error:', error);
        return '0.001'; // Default estimate
    }
}
