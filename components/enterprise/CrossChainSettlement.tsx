import { Paper, Typography, Button, TextField } from '@mui/material';
import { SwapHoriz, Refresh } from '@mui/icons-material';

export function CrossChainSettlement() {
    return (
        <Paper sx={{ p: 3 }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <SwapHoriz sx={{ color: '#3b82f6' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Cross-Chain Settlement
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    Accept any crypto, auto-convert to stablecoins.
                </Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Typography variant="caption" color="text.secondary">From</Typography>
                        <Typography variant="caption" color="text.secondary">Balance: 12.5 ETH</Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: '#6366f1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                }}
                            >
                                ETH
                            </div>
                            <Typography variant="body1" fontWeight="bold">Ethereum</Typography>
                        </div>
                        <Typography variant="h6" fontWeight="bold">5.0</Typography>
                    </div>
                </Paper>

                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                    <div
                        style={{
                            backgroundColor: '#374151',
                            padding: '8px',
                            borderRadius: '50%',
                            border: '1px solid #4b5563',
                        }}
                    >
                        <Refresh sx={{ fontSize: 16, color: '#9ca3af' }} />
                    </div>
                </div>

                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Typography variant="caption" color="text.secondary">To (Auto-Settled)</Typography>
                        <Typography variant="caption" color="text.secondary">Rate: 1 ETH = 3,500 USDC</Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: '#3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                }}
                            >
                                USDC
                            </div>
                            <Typography variant="body1" fontWeight="bold">USDC</Typography>
                        </div>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#10b981' }}>
                            17,500.00
                        </Typography>
                    </div>
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
            </div>
        </Paper>
    );
}
