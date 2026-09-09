import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext, useAppProvider } from './hooks/useAppStore';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
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
          {/* Public pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected intake flow (no layout shell) */}
          <Route path="/intake" element={<ProtectedRoute><SmartIntake /></ProtectedRoute>} />
          <Route path="/profile-confirm" element={<ProtectedRoute><ProfileConfirmation /></ProtectedRoute>} />

          {/* Protected app shell pages */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/schemes" element={<ProtectedRoute><SchemePassport /></ProtectedRoute>} />
            <Route path="/schemes/:id" element={<ProtectedRoute><SchemeDetails /></ProtectedRoute>} />
            <Route path="/planner" element={<ProtectedRoute><BusinessCostPlanner /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><DocumentsReadiness /></ProtectedRoute>} />
            <Route path="/readiness" element={<ProtectedRoute><ReadinessScore /></ProtectedRoute>} />
            <Route path="/partners" element={<ProtectedRoute><PartnerRouting /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviderWrapper>
    </BrowserRouter>
  );
}
