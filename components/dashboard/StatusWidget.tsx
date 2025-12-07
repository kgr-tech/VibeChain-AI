import { Typography, Paper, Chip } from '@mui/material';
import { CheckCircle, Warning, Error as ErrorIcon } from '@mui/icons-material';

export function StatusWidget() {
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                System Status
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#10b981',
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#10b981' }}>
                            Operational
                        </Typography>
                    </div>
                    <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#f59e0b',
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#f59e0b' }}>
                            Processing Slow
                        </Typography>
                    </div>
                    <Warning sx={{ fontSize: 18, color: '#f59e0b' }} />
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#ef4444',
                            }}
                        />
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#ef4444' }}>
                            Process Stop
                        </Typography>
                    </div>
                    <ErrorIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                </div>
            </div>
        </Paper>
    );
}
