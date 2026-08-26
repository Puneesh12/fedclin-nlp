# API Specification — FedClinNLP

This document details the REST endpoints and data contracts for the Node.js Application Layer and Python FastAPI Clinical NLP service.

---

## 1. Node.js Express API (`http://localhost:5000`)

### `GET /health`
Returns backend health and zero-egress status.
```json
{
  "status": "HEALTHY",
  "service": "fedclin-nlp-backend",
  "privacyMode": "ZERO_EGRESS_VPC"
}
```

### `POST /api/v1/auth/login`
Authenticates clinician or researcher session.
- **Request Body**: `{ "email": "doctor@hospital-a.internal", "password": "..." }`
- **Response**: `{ "token": "jwt_...", "user": { "role": "Doctor", "hospitalAffiliation": "Hospital Node A" } }`

---

## 2. FastAPI Clinical NLP Service (`http://localhost:8000`)

### `POST /analyze`
Performs end-to-end DistilBERT-Bio extraction, abstractive summarization, and triage risk scoring.
- **Request Body**:
```json
{
  "raw_clinical_note": "Patient presents with crushing retrosternal chest pain, dyspnea, and elevated troponin.",
  "model_version": "distilbert-bio-v2.4.1",
  "confidence_threshold": 0.85
}
```
- **Response Body**:
```json
{
  "summary": {
    "chief_complaint": "Acute anterior ST-elevation myocardial infarction (STEMI).",
    "clinical_impression": "Emergent cardiovascular crisis requiring immediate primary PCI activation.",
    "risk_factors": ["Troponin I elevation", "Ischemic chest pain"],
    "recommended_actions": ["Immediate Cath Lab transfer", "DAPT loading"],
    "model_confidence": 0.982
  },
  "entities": [
    {
      "id": "e1",
      "text": "crushing retrosternal chest pain",
      "category": "symptom",
      "confidence": 0.98,
      "ontology_code": "SNOMED: 29857009",
      "start_index": 22,
      "end_index": 54
    }
  ],
  "triage": {
    "level": "RED",
    "reason": "Acute coronary syndrome / anterior STEMI detected with critical troponin elevation.",
    "risk_score": 0.98
  },
  "model_version": "distilbert-bio-v2.4.1",
  "timestamp": "2026-08-27T02:46:12Z"
}
```
