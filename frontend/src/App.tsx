import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/Landing/LandingPage'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { OverviewPage } from '@/pages/Dashboard/OverviewPage'
import {
  PatientsListPage,
  PatientDetailPage,
  ClinicalAIPage,
  FederatedLearningPage,
  AnalyticsPage,
  AuditLogsPage,
  SettingsPage,
} from '@/pages/Dashboard/PageShells'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
