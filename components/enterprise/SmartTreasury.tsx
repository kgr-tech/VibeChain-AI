"use client";

import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Security } from '@mui/icons-material';

const data = [
    { name: "Mon", yield: 4.2 },
    { name: "Tue", yield: 4.3 },
    { name: "Wed", yield: 4.1 },
    { name: "Thu", yield: 4.5 },
    { name: "Fri", yield: 4.8 },
    { name: "Sat", yield: 4.9 },
    { name: "Sun", yield: 5.2 },
];

export function SmartTreasury() {
    return (
        <Paper
            sx={{
                p: 3,
                background: 'linear-gradient(to bottom right, #111827, #000)',
            }}
        >
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <TrendingUp sx={{ color: '#a855f7' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Smart Treasury
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                    Auto-hedge volatility and earn yield.
                </Typography>
            </div>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Current APY</Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#10b981' }}>
                            5.2%
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Risk Score</Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#3b82f6' }}>
                            A+
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <div style={{ height: 150, marginBottom: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="yield" stroke="#a855f7" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '8px',
                    borderRadius: '4px',
                }}
            >
                <Security sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography variant="caption" color="text.secondary">
                    Auto-rebalancing triggered when volatility {'>'}5%
                </Typography>
            </div>
        </Paper>
    );
}
