import { Paper, Typography, Box, Button, Chip } from '@mui/material';
import { Description, Bolt } from '@mui/icons-material';

export function InvoiceFinancing() {
    return (
        <Paper
            sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Description sx={{ color: '#6366f1' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Invoice Financing
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Get instant liquidity on unpaid invoices.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                            <Typography variant="body2" fontWeight={500}>
                                Invoice #INV-2024-001
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Client: MegaCorp Ltd.
                            </Typography>
                        </Box>
                        <Chip
                            label="Unpaid"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(245, 158, 11, 0.2)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Typography variant="body2">Dec 15, 2025</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary">Amount</Typography>
                            <Typography variant="h6" fontWeight="bold">$15,000.00</Typography>
                        </Box>
                    </Box>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                            <Typography variant="body2" fontWeight={500}>
                                Invoice #INV-2024-002
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Client: StartUp Inc.
                            </Typography>
                        </Box>
                        <Chip
                            label="Unpaid"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(245, 158, 11, 0.2)',
                                color: '#f59e0b',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Typography variant="body2">Dec 20, 2025</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary">Amount</Typography>
                            <Typography variant="h6" fontWeight="bold">$4,500.00</Typography>
                        </Box>
                    </Box>
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
            </Box>
        </Paper>
    );
}
