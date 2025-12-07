'use client'

import { Typography, Button, Container } from '@mui/material'
import { Rocket, TrendingUp } from '@mui/icons-material'

interface HeroSectionProps {
    onSignInClick: () => void
    onSignUpClick: () => void
}

export function HeroSection({ onSignInClick, onSignUpClick }: HeroSectionProps) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Animated background elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'float 6s ease-in-out infinite',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite',
                }}
            />

            <Container maxWidth="lg">
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 24px',
                            marginBottom: '32px',
                            borderRadius: 50,
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Rocket sx={{ fontSize: 20, color: '#3b82f6' }} />
                        <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 600 }}>
                            Next-Gen Financial Dashboard
                        </Typography>
                    </div>

                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                            fontWeight: 900,
                            mb: 3,
                            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.2,
                        }}
                    >
                        Vibechain AI
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 6,
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxWidth: 700,
                            mx: 'auto',
                            fontSize: { xs: '1.1rem', md: '1.5rem' },
                        }}
                    >
                        Revolutionize your blockchain financial management with AI-powered insights and real-time analytics
                    </Typography>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={onSignUpClick}
                            sx={{
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 15px 50px rgba(59, 130, 246, 0.5)',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                },
                            }}
                        >
                            Get Started Free
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={onSignInClick}
                            sx={{
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </div>

                    <div
                        style={{
                            marginTop: '64px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '48px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { value: '$45M+', label: 'Total Volume' },
                            { value: '10K+', label: 'Active Users' },
                            { value: '99.9%', label: 'Uptime' },
                        ].map((stat, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 900,
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1 }}>
                                    {stat.label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}
