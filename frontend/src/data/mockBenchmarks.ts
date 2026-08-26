import type { BenchmarkComparison, NonIIDNodeDistribution, TrainingConvergencePoint } from '@/types/analytics'

export const MOCK_BENCHMARKS: BenchmarkComparison[] = [
  {
    metric: 'Entity Extraction F1 Score (NER)',
    centralized: 92.4,
    federated: 91.2,
    unit: '%',
    description: 'Micro-averaged F1 across Symptom, Medication, Diagnosis, and Procedure tags.',
    delta: -1.2,
  },
  {
    metric: 'EHR Summarisation ROUGE-L',
    centralized: 89.6,
    federated: 88.4,
    unit: '%',
    description: 'Longest common subsequence metric against physician-annotated reference summaries.',
    delta: -1.2,
  },
  {
    metric: 'Triage Risk Classification Accuracy',
    centralized: 94.1,
    federated: 93.8,
    unit: '%',
    description: 'Multi-class classification accuracy across RED, YELLOW, and GREEN triage tiers.',
    delta: -0.3,
  },
  {
    metric: 'Raw Data Transferred Across Boundary',
    centralized: 1840,
    federated: 0,
    unit: 'MB',
    description: 'Volume of raw patient notes transmitted to external servers (Zero in FL).',
    delta: -1840,
  },
  {
    metric: 'Per-Round Parameter Payload',
    centralized: 0,
    federated: 0.41,
    unit: 'MB',
    description: 'Encrypted weight delta transmitted per participating node per communication round.',
    delta: 0.41,
  },
]

export const MOCK_NON_IID_DISTRIBUTIONS: NonIIDNodeDistribution[] = [
  {
    nodeId: 'node-hosp-a',
    nodeName: 'Hospital A (Cardiology Hub)',
    specialization: 'Cardiovascular & Thoracic',
    categoryBreakdown: [
      { category: 'Cardiology / Acute Coronary', percentage: 68, sampleCount: 12546, color: '#E05252' },
      { category: 'General Internal Medicine', percentage: 20, sampleCount: 3690, color: '#3157D5' },
      { category: 'Oncology', percentage: 12, sampleCount: 2214, color: '#8B5CF6' },
    ],
  },
  {
    nodeId: 'node-hosp-b',
    nodeName: 'Hospital B (Cancer Center)',
    specialization: 'Medical & Surgical Oncology',
    categoryBreakdown: [
      { category: 'Oncology / Chemotherapy', percentage: 72, sampleCount: 10224, color: '#8B5CF6' },
      { category: 'General Internal Medicine', percentage: 18, sampleCount: 2556, color: '#3157D5' },
      { category: 'Cardiology', percentage: 10, sampleCount: 1420, color: '#E05252' },
    ],
  },
  {
    nodeId: 'node-hosp-c',
    nodeName: 'Hospital C (Metropolitan General)',
    specialization: 'Broad Ambulatory & Acute Care',
    categoryBreakdown: [
      { category: 'General Internal Medicine', percentage: 55, sampleCount: 12540, color: '#3157D5' },
      { category: 'Cardiology', percentage: 25, sampleCount: 5700, color: '#E05252' },
      { category: 'Oncology', percentage: 20, sampleCount: 4560, color: '#8B5CF6' },
    ],
  },
]

export const MOCK_CONVERGENCE_POINTS: TrainingConvergencePoint[] = [
  { round: 1, centralizedLoss: 0.72, federatedLoss: 0.78, centralizedF1: 64.2, federatedF1: 61.5 },
  { round: 3, centralizedLoss: 0.54, federatedLoss: 0.59, centralizedF1: 76.4, federatedF1: 73.1 },
  { round: 6, centralizedLoss: 0.41, federatedLoss: 0.45, centralizedF1: 84.1, federatedF1: 82.3 },
  { round: 9, centralizedLoss: 0.32, federatedLoss: 0.36, centralizedF1: 89.2, federatedF1: 87.8 },
  { round: 12, centralizedLoss: 0.27, federatedLoss: 0.30, centralizedF1: 91.5, federatedF1: 90.1 },
  { round: 15, centralizedLoss: 0.24, federatedLoss: 0.27, centralizedF1: 92.4, federatedF1: 91.2 },
]
