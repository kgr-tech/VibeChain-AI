'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Stack,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
} from '@mui/material';
import { Send, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { useWallet } from '@/contexts/WalletContext';
import { PaymentContract, estimatePaymentGas } from '@/lib/contracts/paymentContract';
import SmartContractPaper from './SmartContractPaper';

export default function PaymentProcessor() {
    const { provider, signer, address, isConnected, walletType } = useWallet();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [gasEstimate, setGasEstimate] = useState('');

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showReceiptDialog, setShowReceiptDialog] = useState(false);
    const [paymentResult, setPaymentResult] = useState<any>(null);

    const handleEstimateGas = async () => {
        if (!provider || !signer || !recipient || !amount) return;

        try {
            const estimate = await estimatePaymentGas(provider, signer, recipient, amount);
            setGasEstimate(estimate);
        } catch (error) {
            console.error('Gas estimation failed:', error);
        }
    };

    const handlePayment = async () => {
        if (!provider || !signer || !address) {
            setError('Please connect your wallet first');
            return;
        }

        if (walletType !== 'metamask') {
            setError('Payment currently only supported with MetaMask');
            return;
        }

        if (!recipient || !amount) {
            setError('Please fill in all required fields');
            return;
        }

        setShowConfirmDialog(true);
        await handleEstimateGas();
    };

    const confirmPayment = async () => {
        setShowConfirmDialog(false);
        setIsProcessing(true);
        setError('');

        try {
            const paymentContract = new PaymentContract(provider!, signer!);

            const metadata = JSON.stringify({
                note,
                timestamp: Date.now(),
                sender: address,
            });

            const result = await paymentContract.createPayment(recipient, amount, metadata);

            // Fetch full payment details
            const paymentDetails = await paymentContract.getPayment(result.paymentId);

            setPaymentResult({
                ...paymentDetails,
                transactionHash: result.transactionHash,
            });

            setShowReceiptDialog(true);

            // Reset form
            setRecipient('');
            setAmount('');
            setNote('');
            setGasEstimate('');

        } catch (error: any) {
            console.error('Payment error:', error);
            setError(error.message || 'Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isConnected) {
        return (
            <Card>
                <CardContent>
                    <Alert severity="info">
                        Please connect your wallet to make payments
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card
                sx={{
                    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Send Payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Send cryptocurrency with on-chain receipt generation
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="Recipient Address"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="0x..."
                            fullWidth
                            required
                            disabled={isProcessing}
                        />

                        <TextField
                            label="Amount (ETH)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.1"
                            type="number"
                            fullWidth
                            required
                            disabled={isProcessing}
                            inputProps={{ step: '0.001', min: '0' }}
                        />

                        <TextField
                            label="Note (Optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Payment for services..."
                            fullWidth
                            multiline
                            rows={2}
                            disabled={isProcessing}
                        />

                        {error && (
                            <Alert severity="error" onClose={() => setError('')}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={isProcessing ? <CircularProgress size={20} /> : <Send />}
                            onClick={handlePayment}
                            disabled={isProcessing || !recipient || !amount}
                            sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                },
                                py: 1.5,
                                fontWeight: 600,
                            }}
                        >
                            {isProcessing ? 'Processing...' : 'Send Payment'}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog
                open={showConfirmDialog}
                onClose={() => !isProcessing && setShowConfirmDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Recipient
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                {recipient}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Amount
                            </Typography>
                            <Typography variant="h6" fontWeight={700} color="primary">
                                {amount} ETH
                            </Typography>
                        </Box>

                        {gasEstimate && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Estimated Gas Fee
                                </Typography>
                                <Typography variant="body1">
                                    ~{parseFloat(gasEstimate).toFixed(6)} ETH
                                </Typography>
                            </Box>
                        )}

                        {note && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Note
                                </Typography>
                                <Typography variant="body1">{note}</Typography>
                            </Box>
                        )}

                        <Alert severity="info">
                            This transaction will be recorded on the blockchain and cannot be reversed.
                        </Alert>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirmDialog(false)} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmPayment}
                        variant="contained"
                        disabled={isProcessing}
                        startIcon={isProcessing ? <CircularProgress size={20} /> : <CheckCircle />}
                    >
                        {isProcessing ? 'Processing...' : 'Confirm Payment'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Receipt Dialog */}
            <Dialog
                open={showReceiptDialog}
                onClose={() => setShowReceiptDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircle color="success" />
                        <Typography variant="h6" fontWeight={700}>
                            Payment Successful!
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {paymentResult && <SmartContractPaper payment={paymentResult} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowReceiptDialog(false)} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
