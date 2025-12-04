import { Box, Typography, Grid } from '@mui/material';
import { NFTReceiptCard } from "@/components/receipts/NFTReceiptCard";

const receipts = [
    {
        id: "8821",
        merchant: "Cloud Services Inc.",
        amount: "$1,200.00",
        date: "Nov 30, 2025",
        items: ["Server Hosting (XL)", "Data Transfer (5TB)"],
        txHash: "0x71C...9A2",
        status: "Verified" as const,
    },
    {
        id: "8822",
        merchant: "TechGear Supplies",
        amount: "$3,450.00",
        date: "Nov 29, 2025",
        items: ["MacBook Pro M4", "Magic Mouse", "4K Monitor"],
        txHash: "0x3B2...1C9",
        status: "Verified" as const,
    },
    {
        id: "8823",
        merchant: "Global Contractors",
        amount: "$850.00",
        date: "Nov 28, 2025",
        items: ["UI Design Services", "Logo Animation"],
        txHash: "0x9F1...8D4",
        status: "Verified" as const,
    }
];

export default function ReceiptsPage() {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    NFT Receipts
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Every payment becomes a permanent, verifiable receipt on-chain.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {receipts.map((receipt) => (
                    <Grid item xs={12} md={6} lg={4} key={receipt.id}>
                        <NFTReceiptCard receipt={receipt} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
