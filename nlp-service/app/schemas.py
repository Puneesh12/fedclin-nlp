from typing import List, Optional
from pydantic import BaseModel, Field

class ClinicalEntity(BaseModel):
    id: str
    text: str
    category: str
    confidence: float
    ontology_code: Optional[str] = None
    start_index: int
    end_index: int

class ClinicalSummary(BaseModel):
    chief_complaint: str
    clinical_impression: str
    risk_factors: List[str]
    recommended_actions: List[str]
    model_confidence: float

class TriageAssessment(BaseModel):
    level: str = Field(..., description="RED, YELLOW, or GREEN")
    reason: str
    risk_score: float

class NoteAnalysisRequest(BaseModel):
    raw_clinical_note: str
    model_version: Optional[str] = "distilbert-bio-v2.4.1"
    confidence_threshold: Optional[float] = 0.85

class NoteAnalysisResponse(BaseModel):
    summary: ClinicalSummary
    entities: List[ClinicalEntity]
    triage: TriageAssessment
    model_version: str
    timestamp: str
