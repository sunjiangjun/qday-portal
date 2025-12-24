import { create } from 'zustand';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  provider: null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  provider: null,
  connect: async () => {
    // 模拟连接成功，直接设置一个模拟地址
    const mockAddress = '0x' + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    set({
      address: mockAddress,
      isConnected: true,
      provider: null, // 不需要真实的 provider
    });
  },
  disconnect: () => {
    set({
      address: null,
      isConnected: false,
      provider: null,
    });
  },
}));

