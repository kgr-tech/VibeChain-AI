import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { CreditScoreGauge } from "@/components/credit/CreditScoreGauge";
import { LoanRequestCard } from "@/components/credit/LoanRequestCard";

export const dynamic = 'force-dynamic';

export default function CreditPage() {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Community Credit
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    On-chain reputation unlocks access to instant micro-loans.
                </Typography>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <CreditScoreGauge />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <LoanRequestCard />
                </Grid>
            </Grid>

            <div style={{ marginTop: '32px' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Loan History
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Repaid Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell sx={{ fontWeight: 500 }}>#LN-2024-001</TableCell>
                                <TableCell>$2,000.00</TableCell>
                                <TableCell>
                                    <Chip
                                        label="Repaid"
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(16, 185, 129, 0.2)',
                                            color: '#10b981',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Oct 15, 2025</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ fontWeight: 500 }}>#LN-2024-002</TableCell>
                                <TableCell>$1,500.00</TableCell>
                                <TableCell>
                                    <Chip
                                        label="Repaid"
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(16, 185, 129, 0.2)',
                                            color: '#10b981',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Sep 01, 2025</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
