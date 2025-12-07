'use client';

import { useState } from 'react';
import { Search, Notifications, Person, Logout } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Badge,
    Avatar,
    Box,
    Typography,
    alpha,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import { useAuth } from '@/contexts/AuthContext';
import WalletConnector from '@/components/wallet/WalletConnector';

function UserMenu() {
    const { user, signOut } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <>
            <div
                onClick={handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingLeft: '16px',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                }}
            >
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        background: (theme: any) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                >
                    <Person />
                </Avatar>
                <div style={{ display: 'block' }}>
                    <Typography variant="body2" fontWeight={500}>
                        {user?.email?.split('@')[0] || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email || ''}
                    </Typography>
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        minWidth: 200,
                        background: 'rgba(30, 30, 46, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                </MenuItem>
            </Menu>
        </>
    );
}


export function Header() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: (theme: any) => alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar>
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        marginLeft: 0,
                        width: '300px',
                    }}
                >
                    <div
                        style={{
                            padding: '0 16px',
                            height: '100%',
                            position: 'absolute',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Search sx={{ color: 'text.secondary' }} />
                    </div>
                    <InputBase
                        placeholder="Search transactions..."
                        sx={{
                            color: 'inherit',
                            pl: 6,
                            pr: 2,
                            py: 1,
                            width: '100%',
                        }}
                    />
                </div>

                <div style={{ flex: 1 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <WalletConnector />

                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>

                    <UserMenu />
                </div>
            </Toolbar>
        </AppBar>
    );
}
