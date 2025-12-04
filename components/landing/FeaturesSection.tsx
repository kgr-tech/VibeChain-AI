'use client'

import { Box, Typography, Container, Grid, Paper } from '@mui/material'
import {
    AccountBalance,
    TrendingUp,
    Security,
    Speed,
    Analytics,
    CloudDone,
} from '@mui/icons-material'

const features = [
    {
        icon: AccountBalance,
        title: 'NFT Receipts',
        description: 'Permanent on-chain payment receipts with holographic effects and verification status',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    },
    {
        icon: TrendingUp,
        title: 'Community Credit',
        description: 'On-chain reputation scoring with micro-loan requests and comprehensive history tracking',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    },
    {
        icon: Speed,
        title: 'Growth Model',
        description: 'Automated payroll in stablecoins, invoice financing, and multi-signature treasury',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
        icon: Security,
        title: 'Enterprise Security',
        description: 'Cross-chain settlement with KYC/AML compliance and smart treasury auto-rebalancing',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    {
        icon: Analytics,
        title: 'Real-time Analytics',
        description: 'Advanced charts and insights powered by AI to track your financial performance',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    },
    {
        icon: CloudDone,
        title: 'Cloud Sync',
        description: 'Seamless data synchronization across all your devices with enterprise-grade security',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    },
]

export function FeaturesSection() {
    return (
        <Box
            sx={{
                py: 12,
                background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                            fontWeight: 900,
                            mb: 2,
                            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Powerful Features
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Everything you need to manage your blockchain finances in one place
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Paper
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        background: 'rgba(30, 30, 46, 0.5)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 2,
                                            background: feature.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 32, color: 'white' }} />
                                    </Box>

                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {feature.title}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}
