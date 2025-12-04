import { Box, Typography, Grid, Paper } from '@mui/material';
import { StatusWidget } from "@/components/dashboard/StatusWidget";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatusWidget />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                            },
                        }}
                    >
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Total Revenue
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                            $45,231.89
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                            +20.1% from last month
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
                            },
                        }}
                    >
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Active Invoices
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                            12
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                            +2 new since yesterday
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)',
                            },
                        }}
                    >
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Credit Score
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                            850
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                            Excellent
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <OverviewChart />
                </Grid>

                <Grid item xs={12} lg={4}>
                    <RecentActivity />
                </Grid>
            </Grid>
        </Box>
    );
}
