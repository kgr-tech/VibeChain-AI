import { Paper, Typography, Button, Avatar, alpha } from '@mui/material';
import { Group, Shield, Check } from '@mui/icons-material';

export function MultiSigTreasury() {
    return (
        <Paper sx={{ p: 3 }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Shield sx={{ color: 'success.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Multi-Sig Treasury
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    Require multiple approvals for large transactions.
                </Typography>
            </div>

            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: (theme: any) => alpha(theme.palette.success.main, 0.1),
                    border: '1px solid',
                    borderColor: (theme: any) => alpha(theme.palette.success.main, 0.2),
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(74, 222, 128, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Group sx={{ color: 'success.main' }} />
                    </div>
                    <div>
                        <Typography variant="body2" fontWeight={500}>
                            Active Policy
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'success.main' }}>
                            2 of 3 Signers Required
                        </Typography>
                    </div>
                </div>
                <Button size="small" sx={{ color: 'text.secondary' }}>
                    Edit
                </Button>
            </Paper>

            <div>
                <Typography variant="body2" fontWeight={500} color="text.secondary" gutterBottom>
                    Pending Approvals
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Typography variant="body2">Transfer to Exchange</Typography>
                        <Typography variant="body2" fontWeight="bold">$50,000.00</Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', marginLeft: '-4px' }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 12, border: '2px solid #000' }}>
                                A
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.700', fontSize: 12, border: '2px solid #000', ml: -1 }}>
                                ?
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.700', fontSize: 12, border: '2px solid #000', ml: -1 }}>
                                ?
                            </Avatar>
                        </div>
                        <Typography variant="caption" color="text.secondary">
                            1/2 signatures
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            startIcon={<Check />}
                            color="success"
                            sx={{
                                textTransform: 'none',
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{
                                textTransform: 'none',
                            }}
                        >
                            Reject
                        </Button>
                    </div>
                </Paper>
            </div>
        </Paper>
    );
}
