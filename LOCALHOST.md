# Starting Vibechain AI on Localhost

## Quick Start Guide

### 1. Wait for Dependencies Installation
The current installation is still running. Once it completes:

### 2. Start Development Server

```bash
npm run dev
```

This will start the Next.js development server on **http://localhost:3000**

### 3. What You'll See

Once the server starts, you'll see:
```
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

You'll see the complete landing page with:
- ✅ Hero section
- ✅ Feature cards
- ✅ How it works
- ✅ CTA banner
- ✅ Floating chat widget

### 5. Test Features

#### Connect Wallet
- Click "Connect Wallet" in header
- Choose MetaMask or Cardano wallet
- Approve connection

#### Navigate Pages
- `/` - Landing page
- `/dashboard` - Main dashboard (requires auth)
- `/payments` - Payment processor
- `/receipts` - NFT receipts
- `/credit` - Community credit
- `/growth` - Growth model
- `/enterprise` - Enterprise mode

#### Test Chat-to-Pay
1. Click chat button (bottom-right)
2. Type: "Send 0.1 ETH to 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
3. Review verification dialog
4. Confirm payment

### Current Status

**Dependencies**: Installing...
**Once complete, run**: `npm run dev`

### Troubleshooting

If you see errors:

1. **Module not found**:
   ```bash
   npm install
   ```

2. **Port 3000 in use**:
   ```bash
   npm run dev -- -p 3001
   ```

3. **Clear cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Environment Variables Required

Make sure `.env.local` exists with:
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCdhuBo5Ok_J0i9Xmr0tOiMXHinjmjGC_M
```

### Preview HTML (Alternative)

While waiting, you can open `landing-page-preview.html` directly in your browser to see the design!

### Next Steps After Start

1. ✅ View landing page at localhost:3000
2. ✅ Sign up / Sign in
3. ✅ Connect wallet
4. ✅ Test payment flow
5. ✅ Deploy smart contracts
6. ✅ Test chat-to-pay

---

**Ready to go once installation completes!** 🚀
