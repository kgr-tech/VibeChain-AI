import { Paper, Typography, Box, Chip } from '@mui/material';
import { VerifiedUser, Public, Warning } from '@mui/icons-material';

export function ComplianceDashboard() {
    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <VerifiedUser sx={{ color: '#10b981' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Global Compliance
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Real-time KYC/AML monitoring based on local news.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Public sx={{ fontSize: 20, color: '#10b981' }} />
                        <Box>
                            <Typography variant="body2" fontWeight={500}>
                                North America
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#10b981' }}>
                                Compliant
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label="Low Risk"
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#10b981',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Public sx={{ fontSize: 20, color: '#f59e0b' }} />
                        <Box>
                            <Typography variant="body2" fontWeight={500}>
                                Asia Pacific
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                                Regulatory Update
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label="Medium Risk"
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: 'rgba(245, 158, 11, 0.3)',
                            color: '#f59e0b',
                        }}
                    />
                </Box>

                <Paper
                    sx={{
                        p: 1.5,
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Warning sx={{ fontSize: 16, color: '#ef4444', mt: 0.25 }} />
                        <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ color: '#ef4444' }}>
                                Alert: New Sanctions
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                New sanctions detected in Region X. Automatic transaction blocking enabled for affected entities.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Paper>
    );
}
