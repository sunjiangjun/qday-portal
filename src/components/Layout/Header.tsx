import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../../store/walletStore';
import { Wallet, Globe, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const { address, isConnected, connect, disconnect } = useWalletStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'ja', name: '日本語' },
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <header className="bg-dark-900 border-b border-dark-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* 移动端菜单按钮 */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* 右侧操作区 */}
        <div className="flex items-center justify-end gap-2 lg:gap-4 flex-1">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-primary-400 transition-all duration-200 text-sm lg:text-base"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                {languages.find((l) => l.code === i18n.language)?.name || 'EN'}
              </span>
              <span className="sm:hidden text-xs font-medium">
                {languages.find((l) => l.code === i18n.language)?.code.toUpperCase() || 'EN'}
              </span>
            </button>
            {showLangMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-dark-800 rounded-lg shadow-xl border border-dark-700 overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-dark-700 transition-colors ${
                        i18n.language === lang.code
                          ? 'text-primary-400 bg-dark-700'
                          : 'text-dark-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Wallet Button */}
          {isConnected ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="px-3 lg:px-4 py-2 rounded-lg bg-dark-800 text-dark-300">
                <span className="text-xs lg:text-sm font-medium font-mono">
                  {formatAddress(address!)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/50 text-sm lg:text-base"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{t('wallet.disconnect')}</span>
                <span className="sm:hidden text-xs">Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 lg:px-6 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                {isConnecting ? t('wallet.connecting') : t('wallet.connect')}
              </span>
              <span className="sm:hidden text-xs">
                {isConnecting ? '...' : 'Connect'}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
