import { useTranslation } from 'react-i18next';
import { Search, Coins, Loader2, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

interface TokenBalance {
  qday: string;
  wqday: string;
  wabel: string;
  usd8: string;
  cvxQday: string;
  rewardBalance: string;
}

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const HelpDialog = ({ isOpen, onClose, title, content }: HelpDialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* 对话框 */}
        <div
          className="bg-dark-900 rounded-xl border border-dark-700 shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-dark-300 leading-relaxed">{content}</p>
        </div>
      </div>
    </>
  );
};

interface TokenBalanceCardProps {
  label: string;
  value: string;
  helpKey?: string;
  t: (key: string) => string;
  isReward?: boolean;
}

const TokenBalanceCard = ({ label, value, helpKey, t, isReward }: TokenBalanceCardProps) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="bg-dark-800 rounded-lg p-4 lg:p-6 border border-dark-700 relative">
        <div className="flex items-start justify-between mb-2">
          <p className="text-dark-400 text-xs lg:text-sm">
            {label}
          </p>
          {helpKey && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHelp(true);
              }}
              className="p-0.5 text-dark-500 hover:text-primary-400 transition-colors flex-shrink-0 ml-1"
              aria-label="Help"
            >
              <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          )}
        </div>
        <p className={`font-mono text-lg lg:text-xl font-bold break-all ${isReward ? 'text-primary-400' : 'text-white'}`}>
          {value}
        </p>
      </div>
      {helpKey && (
        <HelpDialog
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
          title={label}
          content={t(`pages.trackAddress.help.${helpKey}`)}
        />
      )}
    </>
  );
};

const TrackAddress = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<TokenBalance | null>(null);

  const handleTrack = async () => {
    if (!address.trim()) return;

    setLoading(true);
    setBalances(null);

    // 模拟 API 请求
    setTimeout(() => {
      // 模拟数据
      const mockBalances: TokenBalance = {
        qday: '1,234.5678',
        wqday: '567.8901',
        wabel: '890.1234',
        usd8: '2,345.6789',
        cvxQday: '123.4567',
        rewardBalance: '45.6789',
      };
      setBalances(mockBalances);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 lg:gap-4 mb-4 lg:mb-8">
        <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg">
          <Search className="w-6 h-6 lg:w-8 lg:h-8 text-primary-400" />
        </div>
        <h1 className="text-xl lg:text-3xl font-bold text-white">
          {t('pages.trackAddress.title')}
        </h1>
      </div>

      <div className="bg-dark-900 rounded-xl p-4 lg:p-8 border border-dark-700 shadow-lg mb-4 lg:mb-6">
        <p className="text-dark-300 text-sm lg:text-lg mb-4 lg:mb-6">
          {t('pages.trackAddress.description')}
        </p>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              placeholder={t('pages.trackAddress.enterAddress')}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={!address.trim() || loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('pages.trackAddress.loading')}
              </>
            ) : (
              t('pages.trackAddress.track')
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-dark-900 rounded-xl p-12 border border-dark-700 shadow-lg text-center">
          <Loader2 className="w-12 h-12 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-dark-300">{t('pages.trackAddress.loading')}</p>
        </div>
      )}

      {balances && !loading && (
        <div className="bg-dark-900 rounded-xl p-4 lg:p-8 border border-dark-700 shadow-lg">
          <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
            <div className="p-2 bg-primary-600/20 rounded-lg">
              <Coins className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              {t('pages.trackAddress.tokenBalances')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <TokenBalanceCard
              label={t('pages.trackAddress.qday')}
              value={balances.qday}
              t={t}
            />
            <TokenBalanceCard
              label={t('pages.trackAddress.wqday')}
              value={balances.wqday}
              t={t}
            />
            <TokenBalanceCard
              label={t('pages.trackAddress.wabel')}
              value={balances.wabel}
              t={t}
            />
            <TokenBalanceCard
              label={t('pages.trackAddress.usd8')}
              value={balances.usd8}
              t={t}
            />
            <TokenBalanceCard
              label={t('pages.trackAddress.cvxQday')}
              value={balances.cvxQday}
              helpKey="cvxQday"
              t={t}
            />
            <TokenBalanceCard
              label={t('pages.trackAddress.rewardBalance')}
              value={balances.rewardBalance}
              helpKey="rewardBalance"
              t={t}
              isReward={true}
            />
          </div>
        </div>
      )}

      {!balances && !loading && address && (
        <div className="bg-dark-900 rounded-xl p-8 border border-dark-700 shadow-lg text-center">
          <p className="text-dark-400">{t('pages.trackAddress.noData')}</p>
        </div>
      )}
    </div>
  );
};

export default TrackAddress;
