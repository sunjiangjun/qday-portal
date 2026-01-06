import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useWalletStore } from './store/walletStore';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AbelBridge from './pages/AbelBridge';
import Staking from './pages/Staking';
import QDAYSwap from './pages/QDAYSwap';
import TrackAddress from './pages/TrackAddress';
import WQDAYConversion from './pages/WQDAYConversion';
import Settings from './pages/Settings';
import DocsStaking from './pages/UserGuidesStaking';
import DocsAbelBridge from './pages/UserGuidesAbelBridge';
import DocsQDAYSwap from './pages/UserGuidesQDAYSwap';

function ProtectedDashboard() {
  const { isConnected } = useWalletStore();
  return isConnected ? <Dashboard /> : <Navigate to="/abel-bridge" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/abel-bridge" replace />} />
          <Route path="dashboard" element={<ProtectedDashboard />} />
          <Route path="abel-bridge" element={<AbelBridge />} />
          <Route path="staking" element={<Staking />} />
          <Route path="qday-swap" element={<QDAYSwap />} />
          <Route path="track-address" element={<TrackAddress />} />
          <Route path="wqday-conversion" element={<WQDAYConversion />} />
          <Route path="settings" element={<Settings />} />
          <Route path="docs/staking" element={<DocsStaking />} />
          <Route path="docs/abel-bridge" element={<DocsAbelBridge />} />
          <Route path="docs/qday-swap" element={<DocsQDAYSwap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

