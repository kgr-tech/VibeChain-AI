import { Typography, Grid } from '@mui/material';
import { CrossChainSettlement } from "@/components/enterprise/CrossChainSettlement";
import { ComplianceDashboard } from "@/components/enterprise/ComplianceDashboard";
import { SmartTreasury } from "@/components/enterprise/SmartTreasury";

export const dynamic = 'force-dynamic';

export default function EnterprisePage() {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Enterprise Mode (Layer 3)
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Scaling solutions for large companies: Cross-chain settlement, Compliance, and Smart Treasury.
                </Typography>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <CrossChainSettlement />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <ComplianceDashboard />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <SmartTreasury />
                </Grid>
            </Grid>
        </div>
    );
}
