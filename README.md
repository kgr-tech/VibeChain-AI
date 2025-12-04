# 🌊 Vibechain AI - Dual-Blockchain DApp

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5-blue)](https://mui.com/)


> **Blockchain payments powered by AI**. Send cryptocurrency with natural language on Ethereum and Cardano.

## 🎯 Features

### 🔗 Dual Blockchain Support
- **Ethereum**: Solidity smart contracts on EVM chains
- **Cardano**: OpShin (Python) smart contracts on Cardano
- Automatic chain detection from wallet addresses

### 🤖 AI-Powered Chat-to-Pay
- Natural language payment processing
- LangChain + Google Gemini AI integration
- Payment verification dialog for security
- "Send 0.1 ETH to 0x..." - AI handles the rest

### 💳 Smart Contract Features
- On-chain payment processing
- Automatic QR code receipt generation
- Transaction verification
- Payment history tracking
- Blockchain explorer integration

### 🔐 Security
- Mandatory payment verification
- Wallet signature required
- Gas/fee estimation
- Network validation
- Testnet-first approach

### 🎨 Beautiful UI/UX
- Premium dark theme with gradients
- Glassmorphism effects
- Material UI components
- Smooth animations
- Fully responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or Cardano wallet (Eternal/Nami/Flint)
- Google Gemini API key
- Supabase account (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vibechain-ai.git
cd vibechain-ai

# Install dependencies
npm install

# Copy environment variables
copy .env.local.example .env.local

# Add your API keys to .env.local
# - NEXT_PUBLIC_GEMINI_API_KEY
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📦 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **UI Library** | Material UI 5, Emotion |
| **Ethereum** | Ethers.js v6, Solidity |
| **Cardano** | Mesh SDK, Lucid, OpShin (Python) |
| **AI** | LangChain, Google Gemini Pro |
| **Backend** | Supabase, PostgreSQL |
| **Deployment** | Vercel |

## 🔧 Smart Contracts

### Ethereum (Solidity)
Located in `contracts/VibechainPayment.sol`
- Deploy to Sepolia testnet for testing
- See [WEB3_SETUP.md](WEB3_SETUP.md) for deployment guide

### Cardano (OpShin)
Located in `contracts/cardano/vibechain_payment.py`
- Compile with OpShin
- Deploy to Preprod testnet
- See [CARDANO_SETUP.md](CARDANO_SETUP.md) for deployment guide

## 🌐 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key

# Smart Contracts
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0x... # Ethereum
NEXT_PUBLIC_CARDANO_CONTRACT_ADDRESS=addr_test1... # Cardano
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_BLOCKFROST_API_KEY=your-blockfrost-key
```

## 📱 Usage

### Connect Wallet
1. Click "Connect Wallet" in header
2. Choose MetaMask (Ethereum) or Cardano wallet
3. Approve connection

### Send Payment
**Option 1: Payment Form**
1. Go to `/payments`
2. Enter recipient address and amount
3. Review and confirm
4. Get QR code receipt

**Option 2: Chat-to-Pay**
1. Click chat button (bottom-right)
2. Type: "Send 0.1 ETH to 0x..."
3. Review verification dialog
4. Confirm payment

## 📚 Documentation

- [Web3 Setup Guide](WEB3_SETUP.md) - Ethereum deployment
- [Cardano Setup Guide](CARDANO_SETUP.md) - Cardano deployment
- [Local Development](LOCALHOST.md) - Running locally
- [Complete Walkthrough](C:\Users\gires\.gemini\antigravity\brain\4895b06c-c8ae-4d3c-9725-8a790804560e\walkthrough.md) - Full feature guide

## 🎯 Project Structure

```
vibechain-ai/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard (protected)
│   └── payments/          # Payment processor
├── components/            # React components
│   ├── wallet/           # Wallet connectors
│   ├── payment/          # Payment processing
│   ├── chatbot/          # AI chatbot
│   └── layout/           # Layout components
├── contracts/            # Smart contracts
│   ├── VibechainPayment.sol      # Ethereum/Solidity
│   └── cardano/
│       └── vibechain_payment.py  # Cardano/OpShin
├── lib/                  # Utilities
│   ├── contracts/       # Contract interactions
│   └── chatbot/         # Gemini AI integration
├── contexts/            # React contexts
└── theme/              # Material UI theme
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [Ethers.js](https://docs.ethers.org/)
- [Mesh SDK](https://meshjs.dev/)
- [LangChain](https://www.langchain.com/)
- [Google Gemini](https://ai.google.dev/)
- [OpShin](https://github.com/OpShin/opshin)

## 🔗 Links

- [Live Demo](#) - Coming soon
- [Documentation](WEB3_SETUP.md)
- [Report Issues](https://github.com/YOUR_USERNAME/vibechain-ai/issues)

---

**Built with ❤️ using dual-blockchain technology**

🌊 Ethereum + Cardano | 🤖 AI-Powered | 🔐 Secure
