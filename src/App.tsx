import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useWalletStore } from './store/walletStore';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AbelBridge from './pages/AbelBridge';
import QDAYStaking from './pages/QDAYStaking';
import ABELStaking from './pages/ABELStaking';
import QDAYSwap from './pages/QDAYSwap';
import TrackAddress from './pages/TrackAddress';
import WQDAYConversion from './pages/WQDAYConversion';
import Settings from './pages/Settings';

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
          <Route path="qday-staking" element={<QDAYStaking />} />
          <Route path="abel-staking" element={<ABELStaking />} />
          <Route path="qday-swap" element={<QDAYSwap />} />
          <Route path="track-address" element={<TrackAddress />} />
          <Route path="wqday-conversion" element={<WQDAYConversion />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

