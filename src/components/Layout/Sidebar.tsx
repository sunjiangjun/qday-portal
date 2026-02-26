import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStore } from '../../store/walletStore';
import { useState } from 'react';
import {
  LayoutDashboard,
  GitBranch,
  Coins,
  ArrowLeftRight,
  Search,
  RefreshCw,
  Settings,
  FileText,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const { isConnected } = useWalletStore();
  const location = useLocation();
  const [docsOpen, setDocsOpen] = useState(
    location.pathname.startsWith('/docs')
  );

  const menuItems = [
    ...(isConnected
      ? [
          {
            path: '/dashboard',
            icon: LayoutDashboard,
            label: t('nav.dashboard'),
          },
        ]
      : []),
    {
      path: '/track-address',
      icon: Search,
      label: t('nav.trackAddress'),
    },
    {
      path: '/staking',
      icon: Coins,
      label: t('nav.staking'),
    },
    {
      path: '/qday-swap',
      icon: ArrowLeftRight,
      label: t('nav.qdaySwap'),
    },
    {
      path: '/abel-bridge',
      icon: GitBranch,
      label: t('nav.abelBridge'),
    },
    {
      path: '/wqday-conversion',
      icon: RefreshCw,
      label: t('nav.wqdayConversion'),
    },
  ];

  const docsSubItems = [
    {
      path: '/docs/staking',
      label: t('nav.docs.staking'),
    },
    {
      path: '/docs/qday-swap',
      label: t('nav.docs.qdaySwap'),
    },
    {
      path: '/docs/abel-bridge',
      label: t('nav.docs.abelBridge'),
    },
  ];

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`
          fixed lg:fixed
          top-0 left-0
          w-64 h-screen
          bg-dark-900 border-r border-dark-700
          flex flex-col
          z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* 移动端关闭按钮 */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-dark-700">
          <Link to="/abel-bridge" onClick={onClose}>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              QDAY Portal
            </h1>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 桌面端标题 */}
        <div className="hidden lg:block p-6 flex-shrink-0">
          <Link to="/abel-bridge">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              QDAY Portal
            </h1>
          </Link>
        </div>

        {/* 中间：导航菜单 */}
        <nav className="px-4 space-y-2 flex-1 flex flex-col overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                        : 'text-dark-300 hover:bg-dark-800 hover:text-primary-400'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}

            {/* Docs 菜单（带子菜单） */}
            <div>
              <button
                onClick={() => setDocsOpen(!docsOpen)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname.startsWith('/docs')
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-primary-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{t('nav.docs.title')}</span>
                </div>
                {docsOpen ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>

              {docsOpen && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-dark-700 pl-2">
                  {docsSubItems.map((subItem) => {
                    return (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                            isActive
                              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                              : 'text-dark-400 hover:bg-dark-800 hover:text-dark-200'
                          }`
                        }
                      >
                        <span>{subItem.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Settings 菜单项 */}
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/50'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-primary-400'
                }`
              }
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{t('nav.settings')}</span>
            </NavLink>
          </div>
        </nav>

        {/* 底部：Portal V2.1 */}
        <div className="p-6 flex-shrink-0 border-t border-dark-700">
          <p className="text-sm text-dark-400 text-center">
            Portal V2.1
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
