'use client'

import { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material'
import { createClient } from '@/lib/supabase/client'

interface SignUpFormProps {
    onSuccess?: () => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (error) throw error

            setSuccess(true)
            setTimeout(() => {
                window.location.href = '/dashboard'
                if (onSuccess) onSuccess()
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Failed to sign up')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Account Created! 🎉
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Redirecting to your dashboard...
                </Typography>
            </Box>
        )
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Get started with Vibechain AI
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                sx={{ mb: 3 }}
                helperText="Minimum 6 characters"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                    },
                }}
            >
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
        </Box>
    )
}
