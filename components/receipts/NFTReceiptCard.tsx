import { Paper, Typography, Button, Chip, alpha } from '@mui/material';
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
                borderColor: (theme: any) => alpha(theme.palette.secondary.main, 0.3),
                background: 'linear-gradient(to bottom, #111827, #000)',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                    borderColor: (theme: any) => alpha(theme.palette.secondary.main, 0.6),
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
            <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '24px', padding: '24px' }}>
                <div
                    style={{
                        width: 64,
                        height: 64,
                        margin: '0 auto',
                        marginBottom: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(236, 72, 153, 0.2)',
                        border: '1px solid rgba(236, 72, 153, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <QrCode sx={{ fontSize: 32, color: 'secondary.main' }} />
                </div>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        background: (theme: any) => `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, #ec4899 100%)`,
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
                        bgcolor: (theme: any) => alpha(theme.palette.success.main, 0.2),
                        color: 'success.main',
                        border: '1px solid',
                        borderColor: (theme: any) => alpha(theme.palette.success.main, 0.3),
                    }}
                />
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Merchant</Typography>
                    <Typography variant="body2" fontWeight={600}>{receipt.merchant}</Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body2">{receipt.date}</Typography>
                </div>

                <div style={{ margin: '16px 0', borderTop: '1px dashed rgba(255, 255, 255, 0.2)', paddingTop: '16px' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Items
                    </Typography>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {receipt.items.map((item, i) => (
                            <Typography key={i} variant="body2" color="text.primary">
                                {item}
                            </Typography>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="body1" fontWeight={500}>Total Paid</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: 'secondary.main' }}>
                        {receipt.amount}
                    </Typography>
                </div>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '16px', display: 'flex', gap: '8px' }}>
                <Button variant="text" fullWidth size="small" startIcon={<Share />}>
                    Share
                </Button>
                <Button variant="text" fullWidth size="small" startIcon={<Download />}>
                    Save
                </Button>
            </div>
        </Paper>
    );
}
