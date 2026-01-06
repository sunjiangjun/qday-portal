import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const DocsStaking = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary-600/20 rounded-lg">
          <FileText className="w-8 h-8 text-primary-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          {t('pages.docs.staking.title')}
        </h1>
      </div>

      <div className="bg-dark-900 rounded-xl p-6 lg:p-8 border border-dark-700 shadow-lg">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-white mb-4">
            {t('pages.docs.staking.content')}
          </h2>
          <p className="text-dark-300 leading-relaxed">
            Staking documentation content will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocsStaking;

