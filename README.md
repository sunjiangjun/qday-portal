# Portal V2.1

A modern Web3 portal application with wallet connectivity, staking, swapping, and tracking features.

## Features

- 🔐 **Wallet Connection**: Connect with MetaMask or other Web3 wallets
- 📊 **Dashboard**: View wallet information and balances (requires wallet connection)
- 🌉 **Abel Bridge**: Cross-chain bridge service
- 💰 **Staking**: QDAY and ABEL token staking
- 🔄 **Swap**: QDAY token swapping
- 🔍 **Track Address**: Track wallet address activity
- 🌐 **Multi-language**: Support for English, Traditional Chinese, and Japanese
- 🎨 **Tech-inspired Design**: Modern, sleek UI with dark theme

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Ethers.js (Web3)
- Zustand (State Management)
- i18next (Internationalization)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── MainLayout.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── AbelBridge.tsx
│   ├── QDAYStaking.tsx
│   ├── ABELStaking.tsx
│   ├── QDAYSwap.tsx
│   └── TrackAddress.tsx
├── store/
│   └── walletStore.ts
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       ├── zh-TW.json
│       └── ja.json
├── App.tsx
├── main.tsx
└── index.css
```

## Features Details

### Wallet Connection
- Supports MetaMask and other Web3 wallets
- Automatically detects account and chain changes
- Displays connected wallet address

### Dashboard
- Only visible after wallet connection
- Shows wallet address and balance
- Connection status indicator

### Navigation
- Left sidebar with main menu items
- Dashboard appears only when wallet is connected
- WQDAY Conversion link opens in new tab

### Multi-language Support
- Language selector in header
- Supports: English, Traditional Chinese, Japanese
- Language preference is saved

## License

MIT

