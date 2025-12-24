import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../store/walletStore';
import { Wallet, Coins, Lock, Gift } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useWalletStore();

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
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.qday')}
            </p>
            <p className="text-white font-mono text-sm lg:text-base font-bold">
              {tokenBalances.qday}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.wqday')}
            </p>
            <p className="text-white font-mono text-sm lg:text-base font-bold">
              {tokenBalances.wqday}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.wabel')}
            </p>
            <p className="text-white font-mono text-sm lg:text-base font-bold">
              {tokenBalances.wabel}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.cvxQday')}
            </p>
            <p className="text-white font-mono text-sm lg:text-base font-bold">
              {tokenBalances.cvxQday}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 lg:p-4 border border-dark-700">
            <p className="text-dark-400 text-xs lg:text-sm mb-1">
              {t('pages.dashboard.usd8')}
            </p>
            <p className="text-white font-mono text-sm lg:text-base font-bold">
              {tokenBalances.usd8}
            </p>
          </div>
        </div>
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
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.stakedAmount')}
              </p>
              <p className="text-white font-mono text-sm lg:text-base font-bold">
                {abelStaking.stakedAmount} WABEL
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.totalRewards')}
              </p>
              <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                {abelStaking.totalRewards} WABEL
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.apy')}
              </p>
              <p className="text-white font-mono text-sm lg:text-base font-bold">
                {abelStaking.apy}
              </p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dark-700">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.pendingRewards')}
              </p>
              <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                {abelStaking.pendingRewards} WABEL
              </p>
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
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.stakedAmount')}
              </p>
              <p className="text-white font-mono text-sm lg:text-base font-bold">
                {qdayStaking.stakedAmount} QDAY
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.totalRewards')}
              </p>
              <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                {qdayStaking.totalRewards} QDAY
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.apy')}
              </p>
              <p className="text-white font-mono text-sm lg:text-base font-bold">
                {qdayStaking.apy}
              </p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dark-700">
              <p className="text-dark-400 text-sm lg:text-base">
                {t('pages.dashboard.pendingRewards')}
              </p>
              <p className="text-primary-400 font-mono text-sm lg:text-base font-bold">
                {qdayStaking.pendingRewards} QDAY
              </p>
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
      </div>
    </div>
  );
};

export default Dashboard;
