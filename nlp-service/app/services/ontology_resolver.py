"""
Medical Clinical Ontology Resolver (SNOMED-CT, ICD-10, LOINC, RxNorm)
"""

from typing import Optional, Dict

ONTOLOGY_MAP: Dict[str, str] = {
    # Symptoms -> SNOMED-CT
    "chest pain": "SNOMED: 29857009",
    "dyspnea": "SNOMED: 267036007",
    "diaphoresis": "SNOMED: 52613005",
    "fever": "SNOMED: 386661006",
    "wheezing": "SNOMED: 56018004",
    "cough": "SNOMED: 11833005",
    "congestion": "SNOMED: 68235000",

    # Diagnoses -> ICD-10
    "stemi": "ICD-10: I21.09",
    "coronary artery disease": "ICD-10: I25.10",
    "neutropenia": "ICD-10: D70.1",
    "breast cancer": "ICD-10: C50.919",
    "asthma": "ICD-10: J45.909",
    "viral infection": "ICD-10: J06.9",

    # Medications -> RxNorm
    "aspirin": "RxNorm: 1191",
    "clopidogrel": "RxNorm: 32968",
    "nitroglycerin": "RxNorm: 7052",
    "cefepime": "RxNorm: 20481",
    "filgrastim": "RxNorm: 228476",
    "albuterol": "RxNorm: 435",

    # Lab Values -> LOINC
    "troponin": "LOINC: 10839-9",
    "anc": "LOINC: 751-8",
    "hemoglobin": "LOINC: 718-7",
}

def resolve_ontology_code(term: str) -> Optional[str]:
    clean_term = term.lower().strip()
    for key, code in ONTOLOGY_MAP.items():
        if key in clean_term:
            return code
    return None
