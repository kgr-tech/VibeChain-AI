'use client';

import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    Stack,
} from '@mui/material';
import {
    AccountBalanceWallet,
    ContentCopy,
    Logout,
    CheckCircle,
} from '@mui/icons-material';
import { useWallet } from '@/contexts/WalletContext';

export default function WalletConnector() {
    const {
        walletType,
        address,
        isConnected,
        isConnecting,
        connectMetaMask,
        connectCardano,
        disconnect,
        chainId,
    } = useWallet();

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConnectMetaMask = async () => {
        await connectMetaMask();
        handleClose();
    };

    const handleConnectCardano = async () => {
        await connectCardano();
        handleClose();
    };

    const truncateAddress = (addr: string) => {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getNetworkName = (id: number | null) => {
        if (!id) return 'Unknown';
        const networks: { [key: number]: string } = {
            1: 'Ethereum',
            5: 'Goerli',
            11155111: 'Sepolia',
            137: 'Polygon',
            80001: 'Mumbai',
        };
        return networks[id] || `Chain ${id}`;
    };

    if (isConnected && address) {
        return (
            <Card
                sx={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <CardContent sx={{ py: 1.5, px: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                            <Typography variant="body2" fontWeight={600}>
                                {truncateAddress(address)}
                            </Typography>
                        </div>

                        {walletType === 'metamask' && chainId && (
                            <Chip
                                label={getNetworkName(chainId)}
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        )}

                        {walletType === 'cardano' && (
                            <Chip
                                label="Cardano"
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #0033AD 0%, #1E88E5 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        )}

                        <Tooltip title={copied ? 'Copied!' : 'Copy address'}>
                            <IconButton size="small" onClick={copyAddress}>
                                <ContentCopy sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Disconnect">
                            <IconButton size="small" onClick={disconnect} color="error">
                                <Logout sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AccountBalanceWallet sx={{ color: '#3b82f6' }} />}
                onClick={handleOpen}
                disabled={isConnecting}
                sx={{
                    backgroundColor: 'white',
                    color: '#3b82f6',
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                    '&:hover': {
                        backgroundColor: '#f8fafc',
                        boxShadow: '0 6px 20px rgba(0, 118, 255, 0.23)',
                    },
                }}
            >
                {isConnecting ? 'CONNECTING...' : 'ONBOARD'}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <DialogTitle>
                    <Typography variant="h5" fontWeight={700}>
                        Connect Your Wallet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Choose a wallet to connect to Vibechain AI
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {/* MetaMask */}
                        <Card
                            onClick={handleConnectMetaMask}
                            sx={{
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                border: '2px solid transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    border: '2px solid #3b82f6',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                                },
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 8,
                                            background: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 32,
                                        }}
                                    >
                                        🦊
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight={700}>
                                            MetaMask
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Connect to Ethereum & EVM chains
                                        </Typography>
                                    </div>
                                    <Chip label="Popular" color="primary" size="small" />
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Cardano Wallets */}
                        <Card
                            onClick={handleConnectCardano}
                            sx={{
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, rgba(0, 51, 173, 0.1) 0%, rgba(30, 136, 229, 0.1) 100%)',
                                border: '2px solid transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    border: '2px solid #0033AD',
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0, 51, 173, 0.3)',
                                },
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 8,
                                            background: 'linear-gradient(135deg, #0033AD 0%, #1E88E5 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 32,
                                        }}
                                    >
                                        ₳
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight={700}>
                                            Cardano Wallet
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Eternal, Nami, Flint & more
                                        </Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 3, textAlign: 'center' }}
                    >
                        By connecting your wallet, you agree to our Terms of Service
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
