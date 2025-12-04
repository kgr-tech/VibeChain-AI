'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Fab,
    Paper,
    TextField,
    IconButton,
    Typography,
    Stack,
    Avatar,
    Slide,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Divider,
} from '@mui/material';
import {
    Chat,
    Close,
    Send,
    SmartToy,
    Person,
    Payment,
    CheckCircle,
    Warning,
} from '@mui/icons-material';
import { generateChatResponse, analyzePaymentIntent, ChatMessage, PaymentIntent } from '@/lib/chatbot/gemini';
import { useWallet } from '@/contexts/WalletContext';

interface ChatWidgetProps {
    onPaymentRequest?: (amount: string, recipient: string, note?: string) => void;
}

export default function ChatWidget({ onPaymentRequest }: ChatWidgetProps) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! I\'m your Vibechain AI assistant. I can help you send payments, check balances, and answer crypto questions. Try: "Send 0.1 ETH to 0x..."',
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { isConnected, address } = useWallet();

    // Payment verification state
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [pendingPayment, setPendingPayment] = useState<PaymentIntent | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: input,
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Analyze for payment intent using LangChain
            const paymentIntent = await analyzePaymentIntent(currentInput);

            if (paymentIntent.isPayment && paymentIntent.confidence > 0.6) {
                // Show verification dialog
                setPendingPayment(paymentIntent);

                const assistantMessage: ChatMessage = {
                    role: 'assistant',
                    content: `I detected a payment request:\n\n💰 Amount: ${paymentIntent.amount} ${paymentIntent.currency || 'ETH'}\n📧 To: ${paymentIntent.recipient?.slice(0, 10)}...${paymentIntent.recipient?.slice(-8)}\n${paymentIntent.note ? `📝 Note: ${paymentIntent.note}\n` : ''}\n${isConnected ? '✅ Please review and confirm the payment details.' : '⚠️ Please connect your wallet first to proceed.'}`,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, assistantMessage]);

                // Show verification dialog if wallet is connected
                if (isConnected && paymentIntent.amount && paymentIntent.recipient) {
                    setShowVerificationDialog(true);
                }
            } else {
                // Generate normal chat response
                const response = await generateChatResponse(currentInput, messages);
                const assistantMessage: ChatMessage = {
                    role: 'assistant',
                    content: response,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: ChatMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPayment = () => {
        if (pendingPayment && pendingPayment.amount && pendingPayment.recipient && onPaymentRequest) {
            onPaymentRequest(pendingPayment.amount, pendingPayment.recipient, pendingPayment.note);

            const confirmMessage: ChatMessage = {
                role: 'assistant',
                content: '✅ Payment request confirmed! Processing your transaction...',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, confirmMessage]);

            setShowVerificationDialog(false);
            setPendingPayment(null);
        }
    };

    const handleCancelPayment = () => {
        const cancelMessage: ChatMessage = {
            role: 'assistant',
            content: '❌ Payment cancelled. How else can I help you?',
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, cancelMessage]);

        setShowVerificationDialog(false);
        setPendingPayment(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const truncateAddress = (addr?: string) => {
        if (!addr) return '';
        return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
    };

    return (
        <>
            {/* Chat FAB Button */}
            <Fab
                color="primary"
                onClick={() => setOpen(!open)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    },
                    zIndex: 1300,
                }}
            >
                {open ? <Close /> : <Chat />}
            </Fab>

            {/* Chat Window */}
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Paper
                    elevation={8}
                    sx={{
                        position: 'fixed',
                        bottom: 100,
                        right: 24,
                        width: 400,
                        height: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1300,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: 'white',
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                <SmartToy />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    Vibechain AI
                                </Typography>
                                <Typography variant="caption">
                                    Chat to Pay • LangChain Powered
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    {/* Wallet Status */}
                    {!isConnected && (
                        <Alert severity="warning" sx={{ m: 1 }}>
                            Connect your wallet to enable payments
                        </Alert>
                    )}

                    {/* Messages */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={1}
                                justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                            >
                                {msg.role === 'assistant' && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <SmartToy sx={{ fontSize: 20 }} />
                                    </Avatar>
                                )}
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        maxWidth: '75%',
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        color: 'white',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                        {msg.content}
                                    </Typography>
                                </Paper>
                                {msg.role === 'user' && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                        <Person sx={{ fontSize: 20 }} />
                                    </Avatar>
                                )}
                            </Stack>
                        ))}
                        {isLoading && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                    <SmartToy sx={{ fontSize: 20 }} />
                                </Avatar>
                                <CircularProgress size={20} />
                            </Stack>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Type a message or payment request..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                multiline
                                maxRows={3}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                sx={{
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                    },
                                }}
                            >
                                <Send />
                            </IconButton>
                        </Stack>
                    </Box>
                </Paper>
            </Slide>

            {/* Payment Verification Dialog */}
            <Dialog
                open={showVerificationDialog}
                onClose={() => { }}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <DialogTitle>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Warning color="warning" />
                        <Typography variant="h6" fontWeight={700}>
                            Verify Payment
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Please carefully review the payment details below. This transaction cannot be reversed.
                    </Alert>

                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                Amount
                            </Typography>
                            <Typography variant="h5" fontWeight={700} color="primary">
                                {pendingPayment?.amount} {pendingPayment?.currency || 'ETH'}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                From (Your Wallet)
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                {truncateAddress(address || '')}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                To (Recipient)
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ wordBreak: 'break-all' }}>
                                {pendingPayment?.recipient}
                            </Typography>
                        </Box>

                        {pendingPayment?.note && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                                    Note
                                </Typography>
                                <Typography variant="body2">
                                    {pendingPayment.note}
                                </Typography>
                            </Box>
                        )}

                        <Alert severity="info">
                            Gas fees will be estimated and added during transaction.
                        </Alert>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={handleCancelPayment}
                        variant="outlined"
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmPayment}
                        variant="contained"
                        startIcon={<CheckCircle />}
                        sx={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            },
                        }}
                    >
                        Confirm Payment
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
