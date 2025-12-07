'use client';

import { Container, Typography, Stack } from '@mui/material';
import PaymentProcessor from '@/components/payment/PaymentProcessor';
import ChatWidget from '@/components/chatbot/ChatWidget';
import { useState } from 'react';

export default function PaymentsPage() {
    const [paymentData, setPaymentData] = useState<{ amount: string; recipient: string; note?: string } | null>(null);

    const handlePaymentRequest = (amount: string, recipient: string, note?: string) => {
        setPaymentData({ amount, recipient, note });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                <div>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Payments
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Send cryptocurrency payments with on-chain receipts
                    </Typography>
                </div>

                <PaymentProcessor />
            </Stack>

            <ChatWidget onPaymentRequest={handlePaymentRequest} />
        </Container>
    );
}
