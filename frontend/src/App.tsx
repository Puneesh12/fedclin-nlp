import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Activity } from 'lucide-react'

// Code-Split Page Components for Optimized Bundle Chunks
const LandingPage = lazy(() => import('@/pages/Landing/LandingPage').then(m => ({ default: m.LandingPage })))
const OverviewPage = lazy(() => import('@/pages/Dashboard/OverviewPage').then(m => ({ default: m.OverviewPage })))
const PatientsListPage = lazy(() => import('@/pages/Patients/PatientsListPage').then(m => ({ default: m.PatientsListPage })))
const PatientDetailPage = lazy(() => import('@/pages/Patients/PatientDetailPage').then(m => ({ default: m.PatientDetailPage })))
const ClinicalAIPage = lazy(() => import('@/pages/ClinicalAI/ClinicalAIPage').then(m => ({ default: m.ClinicalAIPage })))
const FederatedLearningPage = lazy(() => import('@/pages/FederatedLearning/FederatedLearningPage').then(m => ({ default: m.FederatedLearningPage })))
const AnalyticsPage = lazy(() => import('@/pages/Analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })))
const AuditLogsPage = lazy(() => import('@/pages/AuditLogs/AuditLogsPage').then(m => ({ default: m.AuditLogsPage })))
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage').then(m => ({ default: m.SettingsPage })))

const LoadingFallback: React.FC = () => (
  <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
    <div className="h-10 w-10 rounded-2xl bg-[#EEF2FF] text-[#3157D5] flex items-center justify-center animate-pulse">
      <Activity className="h-5 w-5 animate-spin" />
    </div>
    <span className="text-xs font-semibold text-[#667085]">Loading Clinical Module...</span>
  </div>
)

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard Shell with Protected Layout */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<OverviewPage />} />
            <Route path="patients" element={<PatientsListPage />} />
            <Route path="patients/:id" element={<PatientDetailPage />} />
            <Route path="clinical-ai" element={<ClinicalAIPage />} />
            <Route path="federated-learning" element={<FederatedLearningPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
