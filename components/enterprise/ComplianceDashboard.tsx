import { Paper, Typography, Chip } from '@mui/material';
import { VerifiedUser, Public, Warning } from '@mui/icons-material';

export function ComplianceDashboard() {
    return (
        <Paper sx={{ p: 3 }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <VerifiedUser sx={{ color: '#10b981' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Global Compliance
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    Real-time KYC/AML monitoring based on local news.
                </Typography>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Public sx={{ fontSize: 20, color: '#10b981' }} />
                        <div>
                            <Typography variant="body2" fontWeight={500}>
                                North America
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#10b981' }}>
                                Compliant
                            </Typography>
                        </div>
                    </div>
                    <Chip
                        label="Low Risk"
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: 'rgba(16, 185, 129, 0.3)',
                            color: '#10b981',
                        }}
                    />
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
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Public sx={{ fontSize: 20, color: '#f59e0b' }} />
                        <div>
                            <Typography variant="body2" fontWeight={500}>
                                Asia Pacific
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                                Regulatory Update
                            </Typography>
                        </div>
                    </div>
                    <Chip
                        label="Medium Risk"
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: 'rgba(245, 158, 11, 0.3)',
                            color: '#f59e0b',
                        }}
                    />
                </div>

                <Paper
                    sx={{
                        p: 1.5,
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Warning sx={{ fontSize: 16, color: '#ef4444', mt: 0.25 }} />
                        <div>
                            <Typography variant="body2" fontWeight={500} sx={{ color: '#ef4444' }}>
                                Alert: New Sanctions
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                New sanctions detected in Region X. Automatic transaction blocking enabled for affected entities.
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </div>
        </Paper>
    );
}
