"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Dashboard,
    Receipt,
    CreditCard,
    TrendingUp,
    Business,
    Shield,
    Payment,
} from "@mui/icons-material";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    Paper,
} from "@mui/material";

const DRAWER_WIDTH = 240;

const routes = [
    {
        label: "Dashboard",
        icon: Dashboard,
        href: "/dashboard",
        color: "#3b82f6",
    },
    {
        label: "Payments",
        icon: Payment,
        href: "/payments",
        color: "#06b6d4",
    },
    {
        label: "NFT Receipts",
        icon: Receipt,
        href: "/receipts",
        color: "#a855f7",
    },
    {
        label: "Community Credit",
        icon: CreditCard,
        href: "/credit",
        color: "#ec4899",
    },
    {
        label: "Growth (L2)",
        icon: TrendingUp,
        href: "/growth",
        color: "#f97316",
    },
    {
        label: "Enterprise (L3)",
        icon: Business,
        href: "/enterprise",
        color: "#10b981",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    bgcolor: '#111827',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            <Box sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'transparent',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold">V</Typography>
                    </Avatar>
                    <Typography
                        variant="h6"
                        sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                        }}
                    >
                        Vibechain
                    </Typography>
                </Box>
            </Box>

            <List sx={{ px: 2 }}>
                {routes.map((route) => {
                    const Icon = route.icon;
                    const isActive = pathname === route.href;

                    return (
                        <ListItem key={route.href} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={route.href}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Icon sx={{ color: route.color }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={route.label}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Paper
                    sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Current Balance
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                        $124,592.00
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                        <TrendingUp sx={{ fontSize: 14 }} /> +2.4%
                    </Typography>
                </Paper>
            </Box>
        </Drawer>
    );
}
