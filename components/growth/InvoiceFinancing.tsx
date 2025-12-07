import { Paper, Typography, Button, Chip } from '@mui/material';
import { Description, Bolt } from '@mui/icons-material';

export function InvoiceFinancing() {
    return (
        <Paper
            sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            }}
        >
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Description sx={{ color: '#6366f1' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Invoice Financing
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    Get instant liquidity on unpaid invoices.
                </Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <Typography variant="body2" fontWeight={500}>
                                Invoice #INV-2024-001
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Client: MegaCorp Ltd.
                            </Typography>
                        </div>
                        <Chip
                            label="Unpaid"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(245, 158, 11, 0.2)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <div>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Typography variant="body2">Dec 15, 2025</Typography>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary">Amount</Typography>
                            <Typography variant="h6" fontWeight="bold">$15,000.00</Typography>
                        </div>
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Bolt />}
                        sx={{
                            mt: 2,
                            bgcolor: '#6366f1',
                            '&:hover': { bgcolor: '#4f46e5' },
                        }}
                    >
                        Get Advance ($14,250)
                    </Button>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', opacity: 0.75 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <Typography variant="body2" fontWeight={500}>
                                Invoice #INV-2024-002
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Client: StartUp Inc.
                            </Typography>
                        </div>
                        <Chip
                            label="Unpaid"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(245, 158, 11, 0.2)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <div>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Typography variant="body2">Dec 20, 2025</Typography>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary">Amount</Typography>
                            <Typography variant="h6" fontWeight="bold">$4,500.00</Typography>
                        </div>
                    </div>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                            color: '#6366f1',
                            '&:hover': {
                                borderColor: '#6366f1',
                                bgcolor: 'rgba(99, 102, 241, 0.1)',
                            },
                        }}
                    >
                        Get Advance ($4,275)
                    </Button>
                </Paper>
            </div>
        </Paper>
    );
}
