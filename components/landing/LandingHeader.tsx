'use client';

import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import WalletConnector from '@/components/wallet/WalletConnector';

export default function LandingHeader() {
    const navItems = ['Solutions', 'About Us', 'Agents', 'Managers'];

    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{
                background: 'transparent',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                pt: 2
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Navigation Items (Left Aligned as per image) */}
                    <Stack direction="row" spacing={4} alignItems="center" sx={{ flexGrow: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    textTransform: 'none',
                                    opacity: 0.9,
                                    '&:hover': {
                                        opacity: 1,
                                        background: 'rgba(255,255,255,0.05)'
                                    }
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>

                    {/* Right Side: ONBOARD Button */}
                    <Box>
                        <WalletConnector />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
