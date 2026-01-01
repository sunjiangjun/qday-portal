import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../store/walletStore';
import { Wallet, Coins, Lock, Gift, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

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

interface FieldWithHelpProps {
  label: string;
  value: React.ReactNode;
  helpKey: string;
  t: (key: string) => string;
}

const FieldWithHelp = ({ label, value, helpKey, t }: FieldWithHelpProps) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-dark-400 text-sm lg:text-base">{label}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(true);
            }}
            className="p-0.5 text-dark-500 hover:text-primary-400 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        <div className="ml-2">{value}</div>
      </div>
      <HelpDialog
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title={label}
        content={t(`pages.dashboard.help.${helpKey}`)}
      />
    </>
  );
};

interface TokenBalanceCardProps {
  tokenKey: string;
  value: string;
  t: (key: string) => string;
}

const TokenBalanceCard = ({ tokenKey, value, t }: TokenBalanceCardProps) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700 relative">
        <div className="flex items-start justify-between mb-1">
          <p className="text-dark-400 text-xs lg:text-sm">
            {t(`pages.dashboard.${tokenKey}`)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(true);
            }}
            className="p-0.5 text-dark-500 hover:text-primary-400 transition-colors flex-shrink-0"
            aria-label="Help"
          >
            <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </div>
        <p className="text-white font-mono text-sm lg:text-base font-bold">
          {value}
        </p>
      </div>
      <HelpDialog
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title={t(`pages.dashboard.${tokenKey}`)}
        content={t(`pages.dashboard.help.${tokenKey}`)}
      />
    </>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useWalletStore();
  const [showTokenBalancesHelp, setShowTokenBalancesHelp] = useState(false);
  const [showRewardVaultHelp, setShowRewardVaultHelp] = useState(false);

  // 模拟数据
  const tokenBalances = {
    qday: '1,234.5678',
    wqday: '567.8901',
    wabel: '890.1234',
    cvxQday: '123.4567',
    usd8: '2,345.6789',
  };

  const abelStaking = {
    stakedAmount: '500.0000',
    totalRewards: '52.5000',
    apy: '12.5%',
    pendingRewards: '5.2500',
  };

  const qdayStaking = {
    stakedAmount: '1,000.0000',
    totalRewards: '125.0000',
    apy: '15.0%',
    pendingRewards: '12.5000',
  };

  const rewardVault = '1,234.5678';

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-dark-400 text-lg mb-4">
            {t('wallet.notConnected')}
          </p>
          <p className="text-dark-500">
            {t('pages.dashboard.welcome')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-8">
        {t('pages.dashboard.title')}
      </h1>

      {/* 钱包地址卡片 */}
      <div className="bg-dark-900 rounded-xl p-4 lg:p-6 border border-dark-700 shadow-lg">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg flex-shrink-0">
            <Wallet className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.walletAddress')}
            </p>
            <p className="text-white font-mono text-xs lg:text-sm break-all">{address}</p>
          </div>
        </div>
      </div>

      {/* 代币余额 */}
      <div className="bg-dark-900 rounded-xl p-4 lg:p-6 border border-dark-700 shadow-lg">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg">
            <Coins className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-white">
            {t('pages.dashboard.tokenBalances')}
          </h2>
          <button
            onClick={() => setShowTokenBalancesHelp(true)}
            className="p-1 text-dark-500 hover:text-primary-400 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {Object.entries(tokenBalances).map(([key, value]) => (
            <TokenBalanceCard key={key} tokenKey={key} value={value} t={t} />
          ))}
        </div>
        <HelpDialog
          isOpen={showTokenBalancesHelp}
          onClose={() => setShowTokenBalancesHelp(false)}
          title={t('pages.dashboard.tokenBalances')}
          content={t('pages.dashboard.help.tokenBalances')}
        />
      </div>

      {/* Staking 数据 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* ABEL Staking */}
        <div className="bg-dark-900 rounded-xl p-4 lg:p-6 border border-dark-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg">
              <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-white">
              {t('pages.dashboard.abelStaking')}
            </h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <FieldWithHelp
              label={t('pages.dashboard.stakedAmount')}
              value={
                <p className="text-white font-mono text-sm lg:text-base font-bold">
                  {abelStaking.stakedAmount} WABEL
                </p>
              }
              helpKey="stakedAmount"
              t={t}
            />
            <FieldWithHelp
              label={t('pages.dashboard.totalRewards')}
              value={
                <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                  {abelStaking.totalRewards} WABEL
                </p>
              }
              helpKey="totalRewards"
              t={t}
            />
            <FieldWithHelp
              label={t('pages.dashboard.apy')}
              value={
                <p className="text-white font-mono text-sm lg:text-base font-bold">
                  {abelStaking.apy}
                </p>
              }
              helpKey="apy"
              t={t}
            />
            <div className="pt-2 border-t border-dark-700">
              <FieldWithHelp
                label={t('pages.dashboard.pendingRewards')}
                value={
                  <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                    {abelStaking.pendingRewards} WABEL
                  </p>
                }
                helpKey="pendingRewards"
                t={t}
              />
            </div>
          </div>
        </div>

        {/* QDAY Staking */}
        <div className="bg-dark-900 rounded-xl p-4 lg:p-6 border border-dark-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg">
              <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-white">
              {t('pages.dashboard.qdayStaking')}
            </h2>
          </div>
          <div className="space-y-3 lg:space-y-4">
            <FieldWithHelp
              label={t('pages.dashboard.stakedAmount')}
              value={
                <p className="text-white font-mono text-sm lg:text-base font-bold">
                  {qdayStaking.stakedAmount} QDAY
                </p>
              }
              helpKey="stakedAmount"
              t={t}
            />
            <FieldWithHelp
              label={t('pages.dashboard.totalRewards')}
              value={
                <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                  {qdayStaking.totalRewards} QDAY
                </p>
              }
              helpKey="totalRewards"
              t={t}
            />
            <FieldWithHelp
              label={t('pages.dashboard.apy')}
              value={
                <p className="text-white font-mono text-sm lg:text-base font-bold">
                  {qdayStaking.apy}
                </p>
              }
              helpKey="apy"
              t={t}
            />
            <div className="pt-2 border-t border-dark-700">
              <FieldWithHelp
                label={t('pages.dashboard.pendingRewards')}
                value={
                  <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                    {qdayStaking.pendingRewards} QDAY
                  </p>
                }
                helpKey="pendingRewards"
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reward Vault */}
      <div className="bg-dark-900 rounded-xl p-4 lg:p-6 border border-dark-700 shadow-lg">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-primary-600/20 rounded-lg">
            <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-white">
            {t('pages.dashboard.rewardVault')}
          </h2>
          <button
            onClick={() => setShowRewardVaultHelp(true)}
            className="p-1 text-dark-500 hover:text-primary-400 transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 lg:p-6 border border-dark-700">
          <div className="flex justify-between items-center">
            <p className="text-dark-400 text-sm lg:text-base">
              {t('pages.dashboard.rewardVault')} {t('pages.dashboard.balance')}
            </p>
            <p className="text-primary-400 font-mono text-lg lg:text-2xl font-bold">
              {rewardVault} QDAY
            </p>
          </div>
        </div>
        <HelpDialog
          isOpen={showRewardVaultHelp}
          onClose={() => setShowRewardVaultHelp(false)}
          title={t('pages.dashboard.rewardVault')}
          content={t('pages.dashboard.help.rewardVault')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
