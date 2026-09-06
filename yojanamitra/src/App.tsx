import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext, useAppProvider } from './hooks/useAppStore';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import SmartIntake from './pages/SmartIntake';
import ProfileConfirmation from './pages/ProfileConfirmation';
import Dashboard from './pages/Dashboard';
import SchemePassport from './pages/SchemePassport';
import SchemeDetails from './pages/SchemeDetails';
import BusinessCostPlanner from './pages/BusinessCostPlanner';
import DocumentsReadiness from './pages/DocumentsReadiness';
import PartnerRouting from './pages/PartnerRouting';
import ReadinessScore from './pages/ReadinessScore';
import AdminDashboard from './pages/AdminDashboard';

function AppProviderWrapper({ children }: { children: React.ReactNode }) {
  const store = useAppProvider();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviderWrapper>
        <Routes>
          {/* Public / No-layout pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/intake" element={<SmartIntake />} />
          <Route path="/profile-confirm" element={<ProfileConfirmation />} />

          {/* App shell pages */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<SchemePassport />} />
            <Route path="/schemes/:id" element={<SchemeDetails />} />
            <Route path="/planner" element={<BusinessCostPlanner />} />
            <Route path="/documents" element={<DocumentsReadiness />} />
            <Route path="/readiness" element={<ReadinessScore />} />
            <Route path="/partners" element={<PartnerRouting />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviderWrapper>
    </BrowserRouter>
  );
}
