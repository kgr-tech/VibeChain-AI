'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    Tabs,
    Tab,
    IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

interface AuthModalProps {
    open: boolean
    onClose: () => void
    defaultTab?: 'signin' | 'signup'
}

export function AuthModal({ open, onClose, defaultTab = 'signin' }: AuthModalProps) {
    const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab)

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(30, 30, 46, 0.95) 0%, rgba(24, 24, 37, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                },
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'text.secondary',
                }}
            >
                <Close />
            </IconButton>

            <DialogContent sx={{ p: 4 }}>
                <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', marginBottom: '24px' }}>
                    <Tabs
                        value={tab}
                        onChange={(_: React.SyntheticEvent, newValue: string) => setTab(newValue as "signin" | "signup")}
                        centered
                    >
                        <Tab label="Sign In" value="signin" />
                        <Tab label="Sign Up" value="signup" />
                    </Tabs>
                </div>

                {tab === 'signin' ? (
                    <SignInForm onSuccess={onClose} />
                ) : (
                    <SignUpForm onSuccess={onClose} />
                )}
            </DialogContent>
        </Dialog>
    )
}
