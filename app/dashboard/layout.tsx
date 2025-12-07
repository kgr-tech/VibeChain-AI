import type { Metadata } from "next";

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
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ flex: 1, padding: '24px', backgroundColor: '#0f172a' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
