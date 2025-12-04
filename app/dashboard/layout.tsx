import type { Metadata } from "next";
import Box from '@mui/material/Box';
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
    title: "Dashboard - Vibechain AI",
    description: "Financial Dashboard",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
