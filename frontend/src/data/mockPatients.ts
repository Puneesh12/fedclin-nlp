import type { Patient } from '@/types/patient'

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pat-4821',
    mrn: 'MRN-4821',
    name: 'Patient #4821',
    age: 64,
    gender: 'Male',
    hospitalOrigin: 'Hospital A (Cardiology)',
    admissionDate: '2026-08-26 18:45',
    triageStatus: 'RED',
    triageReason: 'Acute retrosternal chest pain, diaphoresis, elevated Troponin I, ST elevation on telemetry',
    assignedPhysician: 'Dr. Elena Rostova (Cardiology)',
    modelVersion: 'distilbert-bio-v2.4.1',
    vitals: {
      heartRate: 118,
      bloodPressure: '168/98',
      respiratoryRate: 24,
      spO2: 92,
      temperature: 37.4,
      timestamp: '2026-08-26 21:15',
    },
    rawClinicalNote: `PATIENT CLINICAL ADMISSION NOTE
Patient: #4821 | Age: 64 | Gender: M | Admitted: 2026-08-26 18:45
CHIEF COMPLAINT:
Severe crushing retrosternal chest pain radiating to left shoulder and jaw, duration 90 minutes. Accompanied by acute dyspnea, nausea, and diaphoresis.

HISTORY OF PRESENT ILLNESS:
64-year-old male with known history of coronary artery disease, hypertension, and hyperlipidemia presents to the emergency department. Symptoms began acutely while at rest. Took sublingual Nitroglycerin x2 with minimal relief.

VITALS:
HR 118 bpm (sinus tachycardia), BP 168/98 mmHg, RR 24/min, SpO2 92% on room air, Temp 37.4°C.

LABORATORY & DIAGNOSTIC:
Stat ECG demonstrates 2.5mm ST-segment elevation in leads V2-V5 consistent with acute anterior STEMI. Initial high-sensitivity Troponin I significantly elevated at 480 ng/L (ref < 14 ng/L). Serum potassium 4.2 mmol/L.

PLAN & INTERVENTIONS:
Immediate cardiac catheterization laboratory activation. Administered Aspirin 325 mg chewed, Clopidogrel 600 mg loading dose, and IV Heparin bolus. Supplemental O2 via nasal cannula at 2 L/min.`,
    entities: [
      { id: 'e1', text: 'crushing retrosternal chest pain', category: 'symptom', confidence: 0.98, ontologyCode: 'SNOMED: 29857009', startIndex: 110, endIndex: 142 },
      { id: 'e2', text: 'acute dyspnea', category: 'symptom', confidence: 0.96, ontologyCode: 'SNOMED: 267036007', startIndex: 185, endIndex: 198 },
      { id: 'e3', text: 'diaphoresis', category: 'symptom', confidence: 0.94, ontologyCode: 'SNOMED: 52613005', startIndex: 211, endIndex: 222 },
      { id: 'e4', text: 'coronary artery disease', category: 'diagnosis', confidence: 0.97, ontologyCode: 'ICD-10: I25.10', startIndex: 265, endIndex: 288 },
      { id: 'e5', text: 'hypertension', category: 'diagnosis', confidence: 0.99, ontologyCode: 'ICD-10: I10', startIndex: 290, endIndex: 302 },
      { id: 'e6', text: 'Nitroglycerin', category: 'medication', confidence: 0.95, ontologyCode: 'RxNorm: 7052', startIndex: 375, endIndex: 388 },
      { id: 'e7', text: 'acute anterior STEMI', category: 'diagnosis', confidence: 0.99, ontologyCode: 'ICD-10: I21.09', startIndex: 550, endIndex: 570 },
      { id: 'e8', text: 'Troponin I 480 ng/L', category: 'lab_value', confidence: 0.97, ontologyCode: 'LOINC: 10839-9', startIndex: 615, endIndex: 634 },
      { id: 'e9', text: 'Aspirin 325 mg', category: 'medication', confidence: 0.98, ontologyCode: 'RxNorm: 1191', startIndex: 720, endIndex: 734 },
      { id: 'e10', text: 'Clopidogrel 600 mg', category: 'medication', confidence: 0.97, ontologyCode: 'RxNorm: 32968', startIndex: 743, endIndex: 761 },
      { id: 'e11', text: 'cardiac catheterization', category: 'procedure', confidence: 0.95, ontologyCode: 'SNOMED: 41976001', startIndex: 675, endIndex: 698 },
    ],
    summary: {
      chiefComplaint: 'Acute anterior ST-elevation myocardial infarction (STEMI) with severe crushing chest pain and diaphoresis.',
      clinicalImpression: 'High-risk cardiovascular emergency requiring emergent primary percutaneous coronary intervention (PCI).',
      keyRiskFactors: ['Elevated Troponin I (480 ng/L)', 'Marked ST elevations V2-V5', 'Unresponsive to sublingual Nitroglycerin'],
      recommendedActions: ['Immediate Cath Lab transfer', 'Dual antiplatelet therapy completed', 'Continuous cardiac telemetry'],
      modelConfidence: 0.982,
      generatedAt: '2026-08-26 18:47',
    },
  },
  {
    id: 'pat-3914',
    mrn: 'MRN-3914',
    name: 'Patient #3914',
    age: 52,
    gender: 'Female',
    hospitalOrigin: 'Hospital B (Oncology)',
    admissionDate: '2026-08-26 14:20',
    triageStatus: 'YELLOW',
    triageReason: 'Post-chemotherapy neutropenic fever, moderate tachycardia, requiring urgent blood cultures and broad-spectrum antibiotics',
    assignedPhysician: 'Dr. Marcus Vance (Medical Oncology)',
    modelVersion: 'distilbert-bio-v2.4.1',
    vitals: {
      heartRate: 104,
      bloodPressure: '112/70',
      respiratoryRate: 19,
      spO2: 97,
      temperature: 38.6,
      timestamp: '2026-08-26 19:30',
    },
    rawClinicalNote: `ONCOLOGY DAY CARE ADMISSION NOTE
Patient: #3914 | Age: 52 | Gender: F | Admitted: 2026-08-26 14:20
CHIEF COMPLAINT:
Fever of 38.6°C at home, mild productive cough, and generalized weakness 8 days following Cycle 3 AC-T adjuvant chemotherapy for Stage IIB invasive ductal carcinoma.

CURRENT VITALS:
HR 104 bpm, BP 112/70 mmHg, RR 19/min, SpO2 97% on ambient air, Temp 38.6°C.

LABORATORY FINDINGS:
Stat CBC reveals Absolute Neutrophil Count (ANC) of 420/mcL (severe neutropenia), WBC 1.8 x 10^9/L, Hemoglobin 10.2 g/dL, Platelets 135,000/mcL. Serum lactate 1.4 mmol/L.

CLINICAL IMPRESSION:
Febrile neutropenia secondary to myelosuppressive chemotherapy. No clear focal source of infection identified on chest radiograph.

MANAGEMENT:
1. Peripheral and central line blood cultures drawn stat.
2. Initiated empiric IV Cefepime 2g q8h.
3. Subcutaneous Filgrastim (G-CSF) 300 mcg daily scheduled.
4. Strict neutropenic precautions instituted.`,
    entities: [
      { id: 'e20', text: 'Fever of 38.6°C', category: 'symptom', confidence: 0.99, ontologyCode: 'SNOMED: 386661006', startIndex: 110, endIndex: 125 },
      { id: 'e21', text: 'invasive ductal carcinoma', category: 'diagnosis', confidence: 0.97, ontologyCode: 'ICD-10: C50.919', startIndex: 205, endIndex: 230 },
      { id: 'e22', text: 'Absolute Neutrophil Count 420/mcL', category: 'lab_value', confidence: 0.96, ontologyCode: 'LOINC: 751-8', startIndex: 350, endIndex: 383 },
      { id: 'e23', text: 'Febrile neutropenia', category: 'diagnosis', confidence: 0.98, ontologyCode: 'ICD-10: D70.1', startIndex: 440, endIndex: 459 },
      { id: 'e24', text: 'IV Cefepime 2g', category: 'medication', confidence: 0.97, ontologyCode: 'RxNorm: 20481', startIndex: 600, endIndex: 614 },
      { id: 'e25', text: 'Filgrastim 300 mcg', category: 'medication', confidence: 0.95, ontologyCode: 'RxNorm: 228476', startIndex: 630, endIndex: 648 },
    ],
    summary: {
      chiefComplaint: 'Febrile neutropenia (ANC 420/mcL) in post-chemotherapy breast oncology patient.',
      clinicalImpression: 'Moderate-risk oncologic urgency; requires empiric broad-spectrum coverage and monitoring for sepsis.',
      keyRiskFactors: ['Severe neutropenia (ANC < 500)', 'Fever 38.6°C', 'Recent immunosuppressive chemotherapy'],
      recommendedActions: ['Stat blood cultures', 'Empiric IV Cefepime', 'Filgrastim G-CSF support'],
      modelConfidence: 0.965,
      generatedAt: '2026-08-26 14:22',
    },
  },
  {
    id: 'pat-1052',
    mrn: 'MRN-1052',
    name: 'Patient #1052',
    age: 38,
    gender: 'Male',
    hospitalOrigin: 'Hospital C (General Med)',
    admissionDate: '2026-08-26 11:10',
    triageStatus: 'GREEN',
    triageReason: 'Mild seasonal upper respiratory infection, normal vitals, no red flags or respiratory distress',
    assignedPhysician: 'Dr. Sarah Lin (Ambulatory Care)',
    modelVersion: 'distilbert-bio-v2.4.1',
    vitals: {
      heartRate: 74,
      bloodPressure: '120/78',
      respiratoryRate: 14,
      spO2: 99,
      temperature: 36.8,
      timestamp: '2026-08-26 11:45',
    },
    rawClinicalNote: `OUTPATIENT CLINICAL ENCOUNTER
Patient: #1052 | Age: 38 | Gender: M | Date: 2026-08-26 11:10
CHIEF COMPLAINT:
Nasal congestion, mild rhinorrhea, and intermittent dry cough for 3 days. Denies shortness of breath, chest tightness, fever, or anosmia.

VITALS:
HR 74 bpm, BP 120/78 mmHg, RR 14/min, SpO2 99% on room air, Temp 36.8°C.

PHYSICAL EXAMINATION:
Oropharynx clear without erythema or exudates. Bilateral lung fields clear to auscultation without wheezing, rales, or rhonchi. Normal respiratory effort.

ASSESSMENT:
Acute viral upper respiratory tract infection (common cold). Low risk, ambulatory follow-up.

PLAN:
Supportive symptomatic management. Adequate hydration, over-the-counter Cetirizine 10 mg daily as needed, saline nasal spray. Return if dyspnea or high fevers develop.`,
    entities: [
      { id: 'e30', text: 'Nasal congestion', category: 'symptom', confidence: 0.98, ontologyCode: 'SNOMED: 68235000', startIndex: 100, endIndex: 116 },
      { id: 'e31', text: 'dry cough', category: 'symptom', confidence: 0.97, ontologyCode: 'SNOMED: 11833005', startIndex: 145, endIndex: 154 },
      { id: 'e32', text: 'viral upper respiratory tract infection', category: 'diagnosis', confidence: 0.98, ontologyCode: 'ICD-10: J06.9', startIndex: 350, endIndex: 389 },
      { id: 'e33', text: 'Cetirizine 10 mg', category: 'medication', confidence: 0.96, ontologyCode: 'RxNorm: 20689', startIndex: 460, endIndex: 476 },
    ],
    summary: {
      chiefComplaint: 'Mild viral rhinosinusitis and dry cough without systemic features.',
      clinicalImpression: 'Routine low-risk outpatient illness; self-limiting viral etiology.',
      keyRiskFactors: ['None identified; normal vital signs and oxygen saturation'],
      recommendedActions: ['Supportive care & hydration', 'Symptomatic antihistamines', 'Routine outpatient follow-up'],
      modelConfidence: 0.991,
      generatedAt: '2026-08-26 11:12',
    },
  },
]
