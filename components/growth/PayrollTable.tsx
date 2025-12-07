import { Paper, Typography, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Send } from '@mui/icons-material';

const employees = [
    { id: 1, name: "Sarah Jenkins", role: "Senior Engineer", salary: "$12,500", status: "Pending", method: "USDC" },
    { id: 2, name: "Michael Chen", role: "Product Designer", salary: "$9,800", status: "Paid", method: "USDT" },
    { id: 3, name: "Jessica Wu", role: "Marketing Lead", salary: "$8,500", status: "Pending", method: "DAI" },
    { id: 4, name: "David Ross", role: "Contractor", salary: "$4,200", status: "Pending", method: "USDC" },
];

export function PayrollTable() {
    return (
        <Paper sx={{ p: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Automated Payroll
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pay global teams instantly in stablecoins.
                    </Typography>
                </div>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#a855f7',
                        color: '#a855f7',
                        '&:hover': {
                            borderColor: '#a855f7',
                            bgcolor: 'rgba(168, 85, 247, 0.1)',
                        },
                    }}
                >
                    Run Payroll
                </Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Method</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{emp.name}</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>{emp.role}</TableCell>
                                <TableCell>{emp.salary}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={emp.method}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'rgba(59, 130, 246, 0.3)',
                                            color: '#3b82f6',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div
                                            style={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                backgroundColor: emp.status === 'Paid' ? '#10b981' : '#f59e0b',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{ color: emp.status === 'Paid' ? '#10b981' : '#f59e0b' }}
                                        >
                                            {emp.status}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    {emp.status !== 'Paid' && (
                                        <Button
                                            size="small"
                                            variant="contained"
                                            endIcon={<Send sx={{ fontSize: 14 }} />}
                                            sx={{
                                                bgcolor: '#3b82f6',
                                                '&:hover': { bgcolor: '#2563eb' },
                                                textTransform: 'none',
                                            }}
                                        >
                                            Pay
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
