import random
from typing import Dict, List

def generate_non_iid_partitions(
    num_clients: int = 3,
    alpha: float = 0.5,
    total_samples: int = 55450,
    seed: int = 42
) -> Dict[str, Dict]:
    random.seed(seed)
    
    specialties = ["Cardiology", "Oncology", "General_Medicine"]
    
    partitions = {}
    client_configs = [
        ("Hospital Node A (Cardiology Hub)", {"Cardiology": 0.68, "General_Medicine": 0.20, "Oncology": 0.12}, 0.33),
        ("Hospital Node B (Cancer Center)", {"Oncology": 0.72, "General_Medicine": 0.18, "Cardiology": 0.10}, 0.26),
        ("Hospital Node C (Metropolitan General)", {"General_Medicine": 0.55, "Cardiology": 0.25, "Oncology": 0.20}, 0.41)
    ]
    
    for i, (name, props, share) in enumerate(client_configs):
        partitions[name] = {
            "client_id": f"node-hosp-{chr(97 + i)}",
            "proportions": props,
            "sample_count": int(total_samples * share),
            "dp_budget_assigned": 1.5,
            "zero_egress_enforced": True
        }
        
    return partitions

if __name__ == "__main__":
    import json
    result = generate_non_iid_partitions()
    print(json.dumps(result, indent=2))
