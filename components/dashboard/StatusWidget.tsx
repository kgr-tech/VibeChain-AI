import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { CheckCircle, Warning, Error as ErrorIcon } from '@mui/icons-material';

export function StatusWidget() {
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                System Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: 'rgba(16, 185, 129, 0.15)',
                            transform: 'translateX(4px)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#10b981',
                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                '@keyframes pulse': {
                                    '0%, 100%': { opacity: 1 },
                                    '50%': { opacity: 0.5 },
                                },
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#10b981' }}>
                            Operational
                        </Typography>
                    </Box>
                    <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
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
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: 'rgba(245, 158, 11, 0.15)',
                            transform: 'translateX(4px)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#f59e0b',
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#f59e0b' }}>
                            Processing Slow
                        </Typography>
                    </Box>
                    <Warning sx={{ fontSize: 18, color: '#f59e0b' }} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: 'rgba(239, 68, 68, 0.15)',
                            transform: 'translateX(4px)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#ef4444',
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#ef4444' }}>
                            Process Stop
                        </Typography>
                    </Box>
                    <ErrorIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                </Box>
            </Box>
        </Paper>
    );
}
