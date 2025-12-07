import { Typography, Grid } from '@mui/material';
import { PayrollTable } from "@/components/growth/PayrollTable";
import { InvoiceFinancing } from "@/components/growth/InvoiceFinancing";
import { MultiSigTreasury } from "@/components/growth/MultiSigTreasury";

export const dynamic = 'force-dynamic';

export default function GrowthPage() {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Growth Model (Layer 2)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Tools for mid-size companies to scale: Payroll, Financing, and Treasury.
                </Typography>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <PayrollTable />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <InvoiceFinancing />
                        <MultiSigTreasury />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
