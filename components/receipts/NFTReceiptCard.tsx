import { Box, Paper, Typography, Button, Chip, alpha } from '@mui/material';
import { QrCode, Share, Download } from '@mui/icons-material';

interface ReceiptProps {
    id: string;
    merchant: string;
    amount: string;
    date: string;
    items: string[];
    txHash: string;
    status: "Verified" | "Pending";
}

export function NFTReceiptCard({ receipt }: { receipt: ReceiptProps }) {
    return (
        <Paper
            sx={{
                maxWidth: 400,
                mx: 'auto',
                overflow: 'hidden',
                border: '2px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.main, 0.3),
                background: 'linear-gradient(to bottom, #111827, #000)',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                    borderColor: (theme) => alpha(theme.palette.secondary.main, 0.6),
                    '&::before': {
                        opacity: 1,
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top right, transparent, rgba(255, 255, 255, 0.05), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    pointerEvents: 'none',
                    zIndex: 1,
                },
            }}
        >
            <Box sx={{ textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 3, p: 3 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                        border: '1px solid',
                        borderColor: (theme) => alpha(theme.palette.secondary.main, 0.5),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <QrCode sx={{ fontSize: 32, color: 'secondary.main' }} />
                </Box>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, #ec4899 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    NFT Receipt #{receipt.id}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1, color: 'text.secondary' }}>
                    {receipt.txHash}
                </Typography>
                <Chip
                    label={`${receipt.status} on-chain`}
                    size="small"
                    sx={{
                        mt: 2,
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.2),
                        color: 'success.main',
                        border: '1px solid',
                        borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
                    }}
                />
            </Box>

            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Merchant</Typography>
                    <Typography variant="body2" fontWeight={600}>{receipt.merchant}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body2">{receipt.date}</Typography>
                </Box>

                <Box sx={{ my: 2, borderTop: '1px dashed rgba(255, 255, 255, 0.2)', pt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Items
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {receipt.items.map((item, i) => (
                            <Typography key={i} variant="body2" color="text.primary">
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="body1" fontWeight={500}>Total Paid</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'secondary.main' }}>
                        {receipt.amount}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 2, display: 'flex', gap: 1 }}>
                <Button variant="text" fullWidth size="small" startIcon={<Share />}>
                    Share
                </Button>
                <Button variant="text" fullWidth size="small" startIcon={<Download />}>
                    Save
                </Button>
            </Box>
        </Paper>
    );
}
