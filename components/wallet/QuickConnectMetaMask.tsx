'use client';

import React from 'react';
import { Button, CircularProgress, Chip, Stack, Tooltip, IconButton } from '@mui/material';
import { ContentCopy, CheckCircle, Logout } from '@mui/icons-material';
import { useWallet } from '@/contexts/WalletContext';

interface QuickConnectMetaMaskProps {
    variant?: 'button' | 'compact';
    showNetwork?: boolean;
}

export default function QuickConnectMetaMask({
    variant = 'button',
    showNetwork = true
}: QuickConnectMetaMaskProps) {
    const {
        address,
        isConnected,
        isConnecting,
        connectMetaMask,
        disconnect,
        chainId,
    } = useWallet();

    const [copied, setCopied] = React.useState(false);

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
            1: 'Mainnet',
            5: 'Goerli',
            11155111: 'Sepolia',
            137: 'Polygon',
            80001: 'Mumbai',
        };
        return networks[id] || `Chain ${id}`;
    };

    // Connected state
    if (isConnected && address) {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                    icon={<CheckCircle sx={{ color: '#10b981 !important' }} />}
                    label={truncateAddress(address)}
                    sx={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.5)',
                        color: 'white',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                            color: '#10b981',
                        },
                    }}
                />

                {showNetwork && chainId && (
                    <Chip
                        label={getNetworkName(chainId)}
                        size="small"
                        sx={{
                            background: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)',
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                )}

                <Tooltip title={copied ? 'Copied!' : 'Copy address'}>
                    <IconButton size="small" onClick={copyAddress} sx={{ color: 'white' }}>
                        <ContentCopy sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Disconnect">
                    <IconButton size="small" onClick={disconnect} sx={{ color: '#ef4444' }}>
                        <Logout sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            </Stack>
        );
    }

    // Not connected - show connect button
    return (
        <Button
            variant="contained"
            onClick={connectMetaMask}
            disabled={isConnecting}
            startIcon={
                isConnecting ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    <span
                        style={{
                            fontSize: 20,
                            lineHeight: 1,
                        }}
                    >
                        🦊
                    </span>
                )
            }
            sx={{
                background: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)',
                color: 'white',
                fontWeight: 700,
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(246, 133, 27, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    background: 'linear-gradient(135deg, #e2761b 0%, #cd6116 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(246, 133, 27, 0.5)',
                },
                '&:disabled': {
                    background: 'rgba(246, 133, 27, 0.5)',
                    color: 'rgba(255, 255, 255, 0.7)',
                },
            }}
        >
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </Button>
    );
}
