import { Box, Typography, Grid } from '@mui/material';
import { PayrollTable } from "@/components/growth/PayrollTable";
import { InvoiceFinancing } from "@/components/growth/InvoiceFinancing";
import { MultiSigTreasury } from "@/components/growth/MultiSigTreasury";

export default function GrowthPage() {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Growth Model (Layer 2)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Tools for mid-size companies to scale: Payroll, Financing, and Treasury.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <PayrollTable />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <InvoiceFinancing />
                        <MultiSigTreasury />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
