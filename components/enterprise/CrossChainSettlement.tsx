import { Paper, Typography, Box, Button, TextField } from '@mui/material';
import { SwapHoriz, Refresh } from '@mui/icons-material';

export function CrossChainSettlement() {
    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SwapHoriz sx={{ color: '#3b82f6' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Cross-Chain Settlement
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Accept any crypto, auto-convert to stablecoins.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">From</Typography>
                        <Typography variant="caption" color="text.secondary">Balance: 12.5 ETH</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: '#6366f1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                }}
                            >
                                ETH
                            </Box>
                            <Typography variant="body1" fontWeight="bold">Ethereum</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold">5.0</Typography>
                    </Box>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                    <Box
                        sx={{
                            bgcolor: '#374151',
                            p: 1,
                            borderRadius: '50%',
                            border: '1px solid #4b5563',
                        }}
                    >
                        <Refresh sx={{ fontSize: 16, color: '#9ca3af' }} />
                    </Box>
                </Box>

                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">To (Auto-Settled)</Typography>
                        <Typography variant="caption" color="text.secondary">Rate: 1 ETH = 3,500 USDC</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                }}
                            >
                                USDC
                            </Box>
                            <Typography variant="body1" fontWeight="bold">USDC</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#10b981' }}>
                            17,500.00
                        </Typography>
                    </Box>
                </Paper>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: '#3b82f6',
                        '&:hover': { bgcolor: '#2563eb' },
                    }}
                >
                    Settle Transaction
                </Button>
            </Box>
        </Paper>
    );
}
