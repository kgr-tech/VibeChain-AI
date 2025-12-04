"use client";

import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Score", value: 850 },
    { name: "Remaining", value: 150 },
];

const COLORS = ["#10b981", "#374151"];

export function CreditScoreGauge() {
    return (
        <Paper
            sx={{
                p: 3,
                border: '1px solid rgba(16, 185, 129, 0.3)',
                background: 'linear-gradient(to bottom, #111827, #000)',
            }}
        >
            <Typography variant="h6" textAlign="center" color="text.secondary" gutterBottom>
                Community Reputation
            </Typography>

            <Box sx={{ position: 'relative', height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -25%)',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h3" fontWeight="bold">
                        850
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500 }}>
                        Excellent
                    </Typography>
                </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2, px: 2 }}>
                Your on-chain reputation grants you access to <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>Tier 1</Box> micro-loans.
            </Typography>
        </Paper>
    );
}
