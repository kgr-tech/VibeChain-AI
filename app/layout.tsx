import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { WalletProvider } from '@/contexts/WalletContext';

export const metadata: Metadata = {
    title: 'Vibechain AI',
    description: 'Blockchain Financial Dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AuthProvider>
                            <WalletProvider>
                                {children}
                            </WalletProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
