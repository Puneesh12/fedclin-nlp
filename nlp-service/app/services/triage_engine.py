"""
Clinical Triage Engine for Automated Urgency Stratification
Classifies notes into RED (High-Risk Emergency), YELLOW (Review Required), GREEN (Routine).
"""

from typing import Tuple, Dict, Any

RED_KEYWORDS = ["stemi", "cardiac arrest", "troponin", "crushing chest pain", "stridor", "status asthmaticus", "anaphylaxis", "severe sepsis"]
YELLOW_KEYWORDS = ["fever", "neutropenia", "chemotherapy", "hemoptysis", "syncope", "tachypnea", "arrhythmia"]

def evaluate_triage(clinical_note: str) -> Tuple[str, str, float]:
    note_lower = clinical_note.lower()

    for kw in RED_KEYWORDS:
        if kw in note_lower:
            return (
                "RED",
                f"Critical risk indicator detected ({kw.upper()}); immediate physician emergency evaluation indicated.",
                0.98
            )

    for kw in YELLOW_KEYWORDS:
        if kw in note_lower:
            return (
                "YELLOW",
                f"Moderate clinical urgency detected ({kw.upper()}); prompt review and targeted diagnostic workup required.",
                0.74
            )

    return (
        "GREEN",
        "Stable physiological presentation; standard outpatient ambulatory care indicated.",
        0.15
    )
