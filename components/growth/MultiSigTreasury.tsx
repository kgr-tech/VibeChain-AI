import { Paper, Typography, Box, Button, Avatar, alpha } from '@mui/material';
import { Group, Shield, Check } from '@mui/icons-material';

export function MultiSigTreasury() {
    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Shield sx={{ color: 'success.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Multi-Sig Treasury
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Require multiple approvals for large transactions.
                </Typography>
            </Box>

            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                    border: '1px solid',
                    borderColor: (theme) => alpha(theme.palette.success.main, 0.2),
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: (theme) => alpha(theme.palette.success.main, 0.2),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Group sx={{ color: 'success.main' }} />
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight={500}>
                            Active Policy
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'success.main' }}>
                            2 of 3 Signers Required
                        </Typography>
                    </Box>
                </Box>
                <Button size="small" sx={{ color: 'text.secondary' }}>
                    Edit
                </Button>
            </Paper>

            <Box>
                <Typography variant="body2" fontWeight={500} color="text.secondary" gutterBottom>
                    Pending Approvals
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2">Transfer to Exchange</Typography>
                        <Typography variant="body2" fontWeight="bold">$50,000.00</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', ml: -0.5 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 12, border: '2px solid #000' }}>
                                A
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.700', fontSize: 12, border: '2px solid #000', ml: -1 }}>
                                ?
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.700', fontSize: 12, border: '2px solid #000', ml: -1 }}>
                                ?
                            </Avatar>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            1/2 signatures
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
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
                    </Box>
                </Paper>
            </Box>
        </Paper>
    );
}
