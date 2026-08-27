"""
Communication Bandwidth & Privacy Egress Analytical Model
Compares centralized raw-data egress against decentralized weight communication.
"""

from typing import Dict

def compare_communication_costs(
    num_patients: int = 55450,
    avg_note_kb: float = 33.2,
    num_rounds: int = 20,
    model_weight_kb: float = 412.0,
    num_clients: int = 3,
) -> Dict[str, float]:
    centralized_raw_mb = (num_patients * avg_note_kb) / 1024.0
    federated_weights_mb = (num_rounds * model_weight_kb * 2 * num_clients) / 1024.0

    return {
        "centralized_raw_data_transmitted_mb": round(centralized_raw_mb, 2),
        "federated_weight_deltas_transmitted_mb": round(federated_weights_mb, 2),
        "raw_patient_data_egress_mb": 0.0,
        "bandwidth_efficiency_gain_pct": round(((centralized_raw_mb - federated_weights_mb) / centralized_raw_mb) * 100, 2),
    }
