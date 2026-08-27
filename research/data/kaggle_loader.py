"""
Kaggle Medical Transcriptions (MTSamples) Dataset Loader
Loads, validates, and partitions real Kaggle clinical records across simulated hospital nodes.
"""

import json
import os
from typing import List, Dict, Any

DATASET_PATH = os.path.join(os.path.dirname(__file__), "kaggle_medical_transcriptions.json")

def load_kaggle_clinical_notes() -> List[Dict[str, Any]]:
    """Loads all Kaggle clinical transcription notes."""
    with open(DATASET_PATH, "r") as f:
        return json.load(f)

def get_kaggle_hospital_partitions() -> Dict[str, List[Dict[str, Any]]]:
    """Partitions Kaggle dataset across simulated hospital nodes."""
    notes = load_kaggle_clinical_notes()
    partitions: Dict[str, List[Dict[str, Any]]] = {
        "Hospital Node A (Cardiology Hub)": [],
        "Hospital Node B (Cancer Center)": [],
        "Hospital Node C (Metropolitan General)": []
    }

    for note in notes:
        part = note.get("hospital_partition")
        if part in partitions:
            partitions[part].append(note)
        else:
            partitions["Hospital Node C (Metropolitan General)"].append(note)

    return partitions

if __name__ == "__main__":
    data = load_kaggle_clinical_notes()
    print(f"Successfully loaded {len(data)} Kaggle clinical transcription records.")
    parts = get_kaggle_hospital_partitions()
    for node, records in parts.items():
        print(f"- {node}: {len(records)} records")
