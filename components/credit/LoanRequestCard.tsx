import { Paper, Typography, Button, Chip } from '@mui/material';
import { ArrowForward, Info } from '@mui/icons-material';

export function LoanRequestCard() {
    return (
        <Paper sx={{ p: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Request Micro-Loan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Instant liquidity based on your reputation.
                    </Typography>
                </div>
                <Chip
                    label="Instant Approval"
                    size="small"
                    sx={{
                        bgcolor: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Typography variant="body2" color="text.secondary">Amount</Typography>
                    <Typography variant="body2" fontWeight="bold">$5,000.00 USDC</Typography>
                </div>
                <div style={{ height: 8, backgroundColor: '#374151', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: '50%', height: '100%', backgroundColor: '#3b82f6', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <Typography variant="caption" color="text.secondary">$100</Typography>
                    <Typography variant="caption" color="text.secondary">$10,000</Typography>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="caption" color="text.secondary">Interest Rate</Typography>
                    <Typography variant="h6" fontWeight="bold">2.5%</Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="caption" color="text.secondary">Duration</Typography>
                    <Typography variant="h6" fontWeight="bold">30 Days</Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="caption" color="text.secondary">Total Repayment</Typography>
                    <Typography variant="h6" fontWeight="bold">$5,125</Typography>
                </Paper>
            </div>

            <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                    },
                }}
            >
                Request Liquidity
            </Button>
        </Paper>
    );
}
