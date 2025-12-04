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
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    pl: 2,
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                        opacity: 0.8,
                    },
                }}
            >
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                >
                    <Person />
                </Avatar>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="body2" fontWeight={500}>
                        {user?.email?.split('@')[0] || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email || ''}
                    </Typography>
                </Box>
            </Box>

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
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 1,
                        backgroundColor: alpha('#fff', 0.05),
                        '&:hover': {
                            backgroundColor: alpha('#fff', 0.08),
                        },
                        ml: 0,
                        width: { sm: 'auto', md: '300px' },
                    }}
                >
                    <Box
                        sx={{
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
                    </Box>
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
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WalletConnector />

                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>

                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
