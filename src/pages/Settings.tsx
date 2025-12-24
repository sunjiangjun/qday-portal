import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Eye, EyeOff } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

const Settings = () => {
  const { t } = useTranslation();
  const { hideZeroBalance, setHideZeroBalance } = useSettingsStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary-600/20 rounded-lg">
          <SettingsIcon className="w-8 h-8 text-primary-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          {t('pages.settings.title')}
        </h1>
      </div>

      <div className="bg-dark-900 rounded-xl p-6 lg:p-8 border border-dark-700 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-6">
          {t('pages.settings.displaySettings')}
        </h2>

        {/* 余额隐藏设置 */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {hideZeroBalance ? (
                  <EyeOff className="w-5 h-5 text-dark-400" />
                ) : (
                  <Eye className="w-5 h-5 text-dark-400" />
                )}
                <h3 className="text-lg font-semibold text-white">
                  {t('pages.settings.hideZeroBalance')}
                </h3>
              </div>
              <p className="text-dark-400 text-sm">
                {t('pages.settings.hideZeroBalanceDescription')}
              </p>
            </div>
            <div className="ml-6">
              <button
                onClick={() => setHideZeroBalance(!hideZeroBalance)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${hideZeroBalance ? 'bg-primary-600' : 'bg-dark-600'}
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900
                `}
                role="switch"
                aria-checked={hideZeroBalance}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${hideZeroBalance ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

