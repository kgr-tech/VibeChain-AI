'use client';

import { useState } from 'react';
import { Box, Container, Typography, Button, Stack, Card, CardContent, Grid, Chip } from '@mui/material';
import {
    AccountBalanceWallet,
    QrCode,
    SmartToy,
    Security,
    Speed,
    TrendingUp,
    CheckCircle,
} from '@mui/icons-material';
import { AuthModal } from '@/components/auth/AuthModal';
import ChatWidget from '@/components/chatbot/ChatWidget';

export default function LandingPage() {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

    const handleSignInClick = () => {
        setAuthTab('signin');
        setAuthModalOpen(true);
    };

    const handleSignUpClick = () => {
        setAuthTab('signup');
        setAuthModalOpen(true);
    };

    const features = [
        {
            icon: <AccountBalanceWallet sx={{ fontSize: 48 }} />,
            title: 'Dual Blockchain Support',
            description: 'Send payments on both Ethereum and Cardano blockchains. Automatic chain detection.',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        },
        {
            icon: <SmartToy sx={{ fontSize: 48 }} />,
            title: 'AI-Powered Chat-to-Pay',
            description: 'Use natural language to send payments. "Send 0.1 ETH to..." - AI handles the rest.',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        },
        {
            icon: <QrCode sx={{ fontSize: 48 }} />,
            title: 'Smart Contract Receipts',
            description: 'Automatic QR code generation for every payment. Blockchain-verified and downloadable.',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
        },
        {
            icon: <Security sx={{ fontSize: 48 }} />,
            title: 'Payment Verification',
            description: 'Review and confirm all payment details before execution. Maximum security.',
            gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        },
        {
            icon: <Speed sx={{ fontSize: 48 }} />,
            title: 'Fast & Reliable',
            description: 'Powered by Solidity (Ethereum) and OpShin (Cardano) smart contracts.',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
        },
        {
            icon: <TrendingUp sx={{ fontSize: 48 }} />,
            title: 'LangChain Integration',
            description: 'Advanced AI with Google Gemini for superior payment intent detection.',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        },
    ];

    const blockchains = [
        { name: 'Ethereum', color: '#3b82f6', symbol: 'ETH', wallet: 'MetaMask' },
        { name: 'Cardano', color: '#0033AD', symbol: 'ADA', wallet: 'Eternal' },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
            }}
        >
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
                <Stack spacing={4} alignItems="center" textAlign="center">
                    {/* Logo */}
                    <Typography
                        variant="h2"
                        fontWeight={900}
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Vibechain AI
                    </Typography>

                    {/* Tagline */}
                    <Typography variant="h3" fontWeight={700} sx={{ maxWidth: 800 }}>
                        Blockchain Payments Powered by AI
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700 }}>
                        Send cryptocurrency payments with natural language. Support for Ethereum and Cardano.
                        Smart contracts, QR receipts, and AI verification all in one platform.
                    </Typography>

                    {/* Blockchain Chips */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
                        {blockchains.map((chain) => (
                            <Chip
                                key={chain.name}
                                label={`${chain.name} (${chain.symbol}) - ${chain.wallet}`}
                                sx={{
                                    bgcolor: chain.color,
                                    color: 'white',
                                    fontWeight: 600,
                                    px: 2,
                                    py: 3,
                                    fontSize: '1rem',
                                }}
                            />
                        ))}
                    </Stack>

                    {/* CTA Buttons */}
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSignUpClick}
                            sx={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                px: 4,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                },
                            }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleSignInClick}
                            sx={{
                                borderColor: '#3b82f6',
                                color: '#3b82f6',
                                px: 4,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: '#2563eb',
                                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Stack>

                    {/* Feature Highlights */}
                    <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CheckCircle color="success" />
                            <Typography variant="body2">Multi-Chain</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CheckCircle color="success" />
                            <Typography variant="body2">AI-Powered</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CheckCircle color="success" />
                            <Typography variant="body2">Secure</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
                    Powerful Features
                </Typography>
                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                    Everything you need for blockchain payments
                </Typography>

                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(59, 130, 246, 0.5)',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 2,
                                            background: feature.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* How It Works Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
                    How It Works
                </Typography>
                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                    Three simple steps to send blockchain payments
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                }}
                            >
                                1
                            </Box>
                            <Typography variant="h6" fontWeight={700}>
                                Connect Wallet
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Link your MetaMask or Eternal Wallet to get started
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                }}
                            >
                                2
                            </Box>
                            <Typography variant="h6" fontWeight={700}>
                                Send Payment
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Use the payment form or chat: "Send 0.1 ETH to 0x..."
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ec4899 0%, #10b981 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                }}
                            >
                                3
                            </Box>
                            <Typography variant="h6" fontWeight={700}>
                                Get Receipt
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Automatic QR code receipt with blockchain verification
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section */}
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Card
                    sx={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        border: 'none',
                    }}
                >
                    <CardContent sx={{ p: 6, textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Join thousands of users sending blockchain payments with AI
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSignUpClick}
                            sx={{
                                bgcolor: 'white',
                                color: '#3b82f6',
                                px: 6,
                                py: 2,
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: '#f0f0f0',
                                },
                            }}
                        >
                            Create Free Account
                        </Button>
                    </CardContent>
                </Card>
            </Container>

            {/* Auth Modal */}
            <AuthModal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                defaultTab={authTab}
            />

            {/* Chatbot Widget - Demo on Landing Page */}
            <ChatWidget />
        </Box>
    );
}
