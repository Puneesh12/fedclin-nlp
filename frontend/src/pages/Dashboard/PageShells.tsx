import React from 'react'

export const PatientsListPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Patient Management & Triage</h1>
    <p className="text-sm text-[#667085]">Search and triage de-identified EHR records across hospital nodes.</p>
  </div>
)

export const PatientDetailPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Clinical Patient Detail</h1>
    <p className="text-sm text-[#667085]">Deep-dive EHR note, NER extraction, and AI triage assessment.</p>
  </div>
)

export const ClinicalAIPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Clinical AI Workbench</h1>
    <p className="text-sm text-[#667085]">Interactive EHR note summarization, entity extraction, and triage simulation.</p>
  </div>
)

export const FederatedLearningPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Federated Learning Operations</h1>
    <p className="text-sm text-[#667085]">Flower FedAvg round control, hospital weight updates, and topology.</p>
  </div>
)

export const AnalyticsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Research Analytics & Benchmarking</h1>
    <p className="text-sm text-[#667085]">Centralized vs Federated performance comparison and Non-IID skew analysis.</p>
  </div>
)

export const AuditLogsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Cryptographic Audit Logs</h1>
    <p className="text-sm text-[#667085]">Immutable ledger of inference events, weight pulls, and access actions.</p>
  </div>
)

export const SettingsPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-[#111827]">Node & Privacy Settings</h1>
    <p className="text-sm text-[#667085]">Configure hospital VPC parameters, differential privacy budgets, and model endpoints.</p>
  </div>
)
