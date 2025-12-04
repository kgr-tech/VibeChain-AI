'use client';

import React, { useRef } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    Button,
    Divider,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Download,
    Print,
    OpenInNew,
    CheckCircle,
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { PaymentData } from '@/lib/contracts/paymentContract';

interface SmartContractPaperProps {
    payment: PaymentData;
}

export default function SmartContractPaper({ payment }: SmartContractPaperProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    const truncateAddress = (addr: string) => {
        return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
    };

    const getExplorerUrl = (txHash: string) => {
        // Sepolia testnet explorer
        return `https://sepolia.etherscan.io/tx/${txHash}`;
    };

    const handleDownload = () => {
        if (!receiptRef.current) return;

        // Create a canvas from the receipt
        import('html2canvas').then((html2canvas) => {
            html2canvas.default(receiptRef.current!).then((canvas) => {
                const link = document.createElement('a');
                link.download = `vibechain-receipt-${payment.paymentId}.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        });
    };

    const handlePrint = () => {
        window.print();
    };

    // QR code data - encode payment information
    const qrData = JSON.stringify({
        paymentId: payment.paymentId,
        from: payment.from,
        to: payment.to,
        amount: payment.amount,
        timestamp: payment.timestamp,
        txHash: payment.transactionHash,
    });

    return (
        <Box>
            <Card
                ref={receiptRef}
                sx={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%) 1',
                    position: 'relative',
                    overflow: 'hidden',
                    '@media print': {
                        border: '2px solid #3b82f6',
                    },
                }}
            >
                {/* Holographic effect overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)',
                        opacity: 0.3,
                        pointerEvents: 'none',
                        animation: 'shimmer 3s infinite',
                        '@keyframes shimmer': {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' },
                        },
                    }}
                />

                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Box>
                            <Typography variant="h4" fontWeight={700} sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Vibechain AI
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Smart Contract Payment Receipt
                            </Typography>
                        </Box>
                        <Chip
                            icon={<CheckCircle />}
                            label="VERIFIED"
                            color="success"
                            sx={{ fontWeight: 700, px: 1 }}
                        />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    {/* Payment Details */}
                    <Stack spacing={2.5} sx={{ mb: 3 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                Payment ID
                            </Typography>
                            <Typography variant="h6" fontWeight={700}>
                                #{payment.paymentId}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                Amount
                            </Typography>
                            <Typography variant="h4" fontWeight={700} color="primary">
                                {payment.amount} ETH
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={3}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                    From
                                </Typography>
                                <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                    {truncateAddress(payment.from)}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                    To
                                </Typography>
                                <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                    {truncateAddress(payment.to)}
                                </Typography>
                            </Box>
                        </Stack>

                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                Date & Time
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                                {formatDate(payment.timestamp)}
                            </Typography>
                        </Box>

                        {payment.transactionHash && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Transaction Hash
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                        {truncateAddress(payment.transactionHash)}
                                    </Typography>
                                    <Tooltip title="View on Explorer">
                                        <IconButton
                                            size="small"
                                            onClick={() => window.open(getExplorerUrl(payment.transactionHash!), '_blank')}
                                            sx={{ '@media print': { display: 'none' } }}
                                        >
                                            <OpenInNew fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        )}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* QR Code */}
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2, display: 'block' }}>
                            Scan to Verify
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-block',
                                p: 2,
                                background: 'white',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <QRCodeSVG
                                value={qrData}
                                size={200}
                                level="H"
                                includeMargin={false}
                            />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                            This QR code contains verified payment data
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Footer */}
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
                        This is a cryptographically verified payment receipt stored on the Ethereum blockchain.
                        <br />
                        Powered by Vibechain AI Smart Contracts
                    </Typography>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 3, '@media print': { display: 'none' } }}>
                <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={handleDownload}
                    fullWidth
                >
                    Download Receipt
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Print />}
                    onClick={handlePrint}
                    fullWidth
                >
                    Print Receipt
                </Button>
                {payment.transactionHash && (
                    <Button
                        variant="contained"
                        startIcon={<OpenInNew />}
                        onClick={() => window.open(getExplorerUrl(payment.transactionHash!), '_blank')}
                        fullWidth
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        }}
                    >
                        View on Explorer
                    </Button>
                )}
            </Stack>
        </Box>
    );
}
