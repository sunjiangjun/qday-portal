import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../store/walletStore';
import { Coins, Clock, Wallet, ChevronDown, Plus, Calendar, Gift, HelpCircle, X } from 'lucide-react';

type StakingToken = 'WABEL' | 'QDAY';

interface Stake {
  id: number;
  amount: number;
  lockPeriod: number;
  startDate: Date;
  rewards: string;
}

const Staking = () => {
  const { t } = useTranslation();
  const { isConnected, connect } = useWalletStore();
  const [selectedToken, setSelectedToken] = useState<StakingToken>('WABEL');
  const [stakeAmount, setStakeAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState('30');
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'stake' | 'myStaking'>('stake');
  const [wabelStakes, setWabelStakes] = useState<Stake[]>([
    {
      id: 1,
      amount: 500.0,
      lockPeriod: 90,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      rewards: '50.25',
    },
  ]);
  const [qdayStakes, setQdayStakes] = useState<Stake[]>([
    {
      id: 2,
      amount: 1000.0,
      lockPeriod: 180,
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      rewards: '125.50',
    },
  ]);

  // 操作状态
  const [extendingStake, setExtendingStake] = useState<{ id: number; token: StakingToken } | null>(null);
  const [addingStake, setAddingStake] = useState<{ id: number; token: StakingToken } | null>(null);
  const [extendDays, setExtendDays] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [showPendingRewardsHelp, setShowPendingRewardsHelp] = useState(false);

  // 模拟数据
  const availableBalances = {
    WABEL: 1000.0,
    QDAY: 2000.0,
  };

  const lockPeriods = [
    { value: '7', label: `7 ${t('pages.abelStaking.days')}` },
    { value: '30', label: `30 ${t('pages.abelStaking.days')}` },
    { value: '90', label: `90 ${t('pages.abelStaking.days')}` },
    { value: '180', label: `180 ${t('pages.abelStaking.days')}` },
    { value: '365', label: `1 ${t('pages.abelStaking.year')}` },
  ];

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    const newStake: Stake = {
      id: Date.now(),
      amount: parseFloat(stakeAmount),
      lockPeriod: parseInt(lockPeriod),
      startDate: new Date(),
      rewards: (parseFloat(stakeAmount) * 0.1).toFixed(2),
    };

    if (selectedToken === 'WABEL') {
      setWabelStakes([...wabelStakes, newStake]);
    } else {
      setQdayStakes([...qdayStakes, newStake]);
    }
    setStakeAmount('');
  };

  const handleExtendLockPeriod = () => {
    if (!extendingStake || !extendDays || parseFloat(extendDays) <= 0) return;
    
    const days = parseInt(extendDays);
    if (extendingStake.token === 'WABEL') {
      setWabelStakes(wabelStakes.map(stake => 
        stake.id === extendingStake.id ? { ...stake, lockPeriod: stake.lockPeriod + days } : stake
      ));
    } else {
      setQdayStakes(qdayStakes.map(stake => 
        stake.id === extendingStake.id ? { ...stake, lockPeriod: stake.lockPeriod + days } : stake
      ));
    }
    setExtendingStake(null);
    setExtendDays('');
  };

  const handleAddStakeAmount = () => {
    if (!addingStake || !addAmount || parseFloat(addAmount) <= 0) return;
    
    const amount = parseFloat(addAmount);
    if (addingStake.token === 'WABEL') {
      setWabelStakes(wabelStakes.map(stake => 
        stake.id === addingStake.id ? { ...stake, amount: stake.amount + amount } : stake
      ));
    } else {
      setQdayStakes(qdayStakes.map(stake => 
        stake.id === addingStake.id ? { ...stake, amount: stake.amount + amount } : stake
      ));
    }
    setAddingStake(null);
    setAddAmount('');
  };

  const handleClaimRewards = () => {
    if (!claimAmount || parseFloat(claimAmount) <= 0) return;
    // Mock claim rewards
    alert(t('pages.abelStaking.claimRewards') + `: ${claimAmount} QDAY`);
    setClaimAmount('');
  };

  // 将 WABEL 奖励转换为 QDAY（假设 1 WABEL = 1 QDAY，实际应该根据汇率）
  const totalPendingRewards = 
    wabelStakes.reduce((sum, stake) => sum + parseFloat(stake.rewards), 0) +
    qdayStakes.reduce((sum, stake) => sum + parseFloat(stake.rewards), 0);

  const availableBalance = availableBalances[selectedToken];

  // HelpDialog 组件
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
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
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

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600/20 rounded-full">
              <Coins className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              {t('pages.staking.title')}
            </h1>
          </div>
          <p className="text-dark-300 text-lg text-center max-w-2xl mx-auto">
            {t('pages.staking.description')}
          </p>
        </div>

        <div className="bg-dark-900 rounded-xl p-12 border border-dark-700 shadow-lg text-center">
          <Wallet className="w-16 h-16 text-dark-500 mx-auto mb-6" />
          <p className="text-dark-300 text-xl mb-4">
            {t('pages.abelStaking.connectWallet')}
          </p>
          <p className="text-dark-400 mb-8">
            {t('pages.abelStaking.connectTestnet')}
          </p>
          <button
            onClick={connect}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/50 font-medium text-lg"
          >
            {t('wallet.connect')}
          </button>
        </div>
      </div>
    );
  }

  const renderStakeList = (stakes: Stake[], token: StakingToken, tokenName: string) => {
    if (stakes.length === 0) {
      return (
        <div className="text-center py-8">
          <Clock className="w-10 h-10 text-dark-500 mx-auto mb-3" />
          <p className="text-dark-400">{t('pages.abelStaking.noStakes')}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {stakes.map((stake) => {
          const daysElapsed = Math.floor(
            (Date.now() - stake.startDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          const daysRemaining = Math.max(0, stake.lockPeriod - daysElapsed);
          const progress = Math.min(100, (daysElapsed / stake.lockPeriod) * 100);
          const isExtending = extendingStake?.id === stake.id && extendingStake?.token === token;
          const isAdding = addingStake?.id === stake.id && addingStake?.token === token;

          return (
            <div
              key={stake.id}
              className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-primary-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-white font-semibold text-lg">
                      {stake.amount.toFixed(2)} {tokenName}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <p className="text-dark-400">
                      {t('pages.abelStaking.lockPeriod')}: {stake.lockPeriod} {t('pages.abelStaking.days')}
                    </p>
                    {daysRemaining > 0 && (
                      <p className="text-primary-400">
                        {daysRemaining} {t('pages.abelStaking.daysLeft')}
                      </p>
                    )}
                  </div>
                  {progress < 100 && (
                    <div className="mt-2 w-full bg-dark-700 rounded-full h-1.5">
                      <div
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 延长锁定期输入 */}
              {isExtending ? (
                <div className="mb-3 p-3 bg-dark-700/50 rounded-lg">
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    {t('pages.abelStaking.extendDays')} ({t('pages.abelStaking.days')})
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={extendDays}
                      onChange={(e) => setExtendDays(e.target.value)}
                      placeholder={t('pages.abelStaking.enterExtendDays')}
                      className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <button
                      onClick={handleExtendLockPeriod}
                      disabled={!extendDays || parseFloat(extendDays) <= 0}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('pages.abelStaking.confirm')}
                    </button>
                    <button
                      onClick={() => {
                        setExtendingStake(null);
                        setExtendDays('');
                      }}
                      className="px-4 py-2 bg-dark-700 text-dark-300 rounded-lg hover:bg-dark-600 transition-colors text-sm font-medium"
                    >
                      {t('pages.abelStaking.cancel')}
                    </button>
                  </div>
                </div>
              ) : isAdding ? (
                <div className="mb-3 p-3 bg-dark-700/50 rounded-lg">
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    {t('pages.abelStaking.addAmount')} ({tokenName})
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      placeholder={t('pages.abelStaking.enterAddAmount')}
                      className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      autoFocus
                    />
                    <button
                      onClick={handleAddStakeAmount}
                      disabled={!addAmount || parseFloat(addAmount) <= 0}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('pages.abelStaking.confirm')}
                    </button>
                    <button
                      onClick={() => {
                        setAddingStake(null);
                        setAddAmount('');
                      }}
                      className="px-4 py-2 bg-dark-700 text-dark-300 rounded-lg hover:bg-dark-600 transition-colors text-sm font-medium"
                    >
                      {t('pages.abelStaking.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setExtendingStake({ id: stake.id, token });
                      setAddingStake(null);
                      setExtendDays('');
                    }}
                    className="flex-1 px-3 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    {t('pages.abelStaking.extendLockPeriod')}
                  </button>
                  <button
                    onClick={() => {
                      setAddingStake({ id: stake.id, token });
                      setExtendingStake(null);
                      setAddAmount('');
                    }}
                    className="flex-1 px-3 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t('pages.abelStaking.addStakeAmount')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600/20 rounded-full">
            <Coins className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            {t('pages.staking.title')}
          </h1>
        </div>
        <p className="text-dark-300 text-lg text-center max-w-2xl mx-auto">
          {t('pages.staking.description')}
        </p>
      </div>

      <div className="flex justify-center">
        {/* Stake Form / My Staking */}
        <div className="w-full max-w-2xl bg-dark-900 rounded-xl p-6 lg:p-8 border border-dark-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('stake')}
                className={`text-2xl font-bold transition-colors ${
                  activeTab === 'stake'
                    ? 'text-white'
                    : 'text-dark-400 hover:text-dark-300'
                }`}
              >
                {t('pages.abelStaking.stake')}
              </button>
              <button
                onClick={() => setActiveTab('myStaking')}
                className={`text-2xl font-bold transition-colors ${
                  activeTab === 'myStaking'
                    ? 'text-white'
                    : 'text-dark-400 hover:text-dark-300'
                }`}
              >
                {t('pages.staking.myStaking')}
              </button>
            </div>
          </div>

          {activeTab === 'stake' && (
            <div className="space-y-6">
              {/* 币种选择下拉框 */}
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">
                  {t('pages.staking.selectToken')}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white flex items-center justify-between hover:bg-dark-700 transition-colors"
                  >
                    <span>{selectedToken === 'WABEL' ? t('pages.staking.stakeWABEL') : t('pages.staking.stakeQDAY')}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showTokenDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showTokenDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowTokenDropdown(false)}
                      />
                      <div className="absolute z-20 w-full mt-1 bg-dark-800 border border-dark-700 rounded-lg shadow-lg overflow-hidden">
                        <button
                          onClick={() => {
                            setSelectedToken('WABEL');
                            setShowTokenDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-dark-700 transition-colors ${
                            selectedToken === 'WABEL' ? 'bg-primary-600/20 text-primary-400' : 'text-white'
                          }`}
                        >
                          {t('pages.staking.stakeWABEL')}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedToken('QDAY');
                            setShowTokenDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-dark-700 transition-colors ${
                            selectedToken === 'QDAY' ? 'bg-primary-600/20 text-primary-400' : 'text-white'
                          }`}
                        >
                          {t('pages.staking.stakeQDAY')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">
                  {t('pages.abelStaking.stakeAmount')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setStakeAmount(availableBalance.toString())}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs bg-primary-600/20 text-primary-400 rounded hover:bg-primary-600/30 transition-colors"
                  >
                    MAX
                  </button>
                </div>
                <p className="text-dark-500 text-xs mt-2">
                  {t('pages.abelStaking.availableBalance')}: {availableBalance.toFixed(2)} {selectedToken}
                </p>
              </div>

              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">
                  {t('pages.abelStaking.lockPeriod')}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {lockPeriods.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setLockPeriod(period.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        lockPeriod === period.value
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                          : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-700'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > availableBalance}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('pages.abelStaking.stake')}
              </button>
            </div>
          )}

          {activeTab === 'myStaking' && (
            <div className="space-y-6">
              {/* 待领取奖励 */}
              {totalPendingRewards > 0 && (
                <div className="bg-gradient-to-r from-primary-600/20 to-primary-500/20 rounded-lg p-4 border border-primary-600/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-600/30 rounded-lg">
                        <Gift className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-dark-300 text-sm">{t('pages.abelStaking.totalPendingRewards')}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPendingRewardsHelp(true);
                            }}
                            className="p-0.5 text-dark-500 hover:text-primary-400 transition-colors"
                            aria-label="Help"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary-400 font-semibold text-xl">
                          {totalPendingRewards.toFixed(2)} QDAY
                        </p>
                      </div>
                    </div>
                  </div>
                  <HelpDialog
                    isOpen={showPendingRewardsHelp}
                    onClose={() => setShowPendingRewardsHelp(false)}
                    title={t('pages.abelStaking.totalPendingRewards')}
                    content={t('pages.abelStaking.help.totalPendingRewards')}
                  />
                  <div className="space-y-2">
                    <label className="block text-dark-300 text-sm font-medium">
                      {t('pages.abelStaking.claimAmount')} (QDAY)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(e.target.value)}
                        placeholder={t('pages.abelStaking.enterClaimAmount')}
                        className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={handleClaimRewards}
                        disabled={!claimAmount || parseFloat(claimAmount) <= 0}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('pages.abelStaking.claimRewards')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ABEL Staking */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t('pages.abelStaking.abelStaking')}
                </h3>
                {renderStakeList(wabelStakes, 'WABEL', 'WABEL')}
              </div>

              {/* QDAY Staking */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 mt-6">
                  {t('pages.abelStaking.qdayStaking')}
                </h3>
                {renderStakeList(qdayStakes, 'QDAY', 'QDAY')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staking;
