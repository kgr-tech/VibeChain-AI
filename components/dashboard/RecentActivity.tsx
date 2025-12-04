import { Paper, Typography, Box, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward, MoreHoriz } from '@mui/icons-material';

const transactions = [
    {
        id: 1,
        name: "Payroll: Engineering Team",
        amount: "-$45,200.00",
        status: "Completed",
        date: "Today, 10:23 AM",
        type: "outgoing",
    },
    {
        id: 2,
        name: "Invoice #4022 - TechCorp",
        amount: "+$12,500.00",
        status: "Processing",
        date: "Today, 09:15 AM",
        type: "incoming",
    },
    {
        id: 3,
        name: "Treasury Yield",
        amount: "+$342.50",
        status: "Completed",
        date: "Yesterday, 11:45 PM",
        type: "incoming",
    },
    {
        id: 4,
        name: "Cloud Infrastructure",
        amount: "-$1,200.00",
        status: "Completed",
        date: "Yesterday, 02:30 PM",
        type: "outgoing",
    },
];

export function RecentActivity() {
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Recent Activity</Typography>
                <IconButton size="small">
                    <MoreHoriz />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {transactions.map((tx) => (
                    <Box
                        key={tx.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            '&:hover': {
                                '& .MuiTypography-root': {
                                    color: 'primary.main',
                                },
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: tx.type === 'incoming' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                }}
                            >
                                {tx.type === 'incoming' ? (
                                    <ArrowDownward sx={{ fontSize: 20, color: '#10b981' }} />
                                ) : (
                                    <ArrowUpward sx={{ fontSize: 20, color: '#ef4444' }} />
                                )}
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight={500}>
                                    {tx.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {tx.date}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                sx={{ color: tx.type === 'incoming' ? '#10b981' : 'text.primary' }}
                            >
                                {tx.amount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {tx.status}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
}
