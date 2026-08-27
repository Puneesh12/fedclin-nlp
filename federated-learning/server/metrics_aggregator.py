"""
Client Validation Metrics Aggregator for Multi-Hospital Evaluation
Computes weighted micro and macro F1, ROUGE-L, and validation loss across hospital nodes.
"""

from typing import List, Tuple, Dict

def weighted_average_metrics(metrics_list: List[Tuple[int, Dict[str, float]]]) -> Dict[str, float]:
    """Aggregates client evaluation metrics weighted by private local dataset size."""
    total_examples = sum(num_examples for num_examples, _ in metrics_list)

    if total_examples == 0:
        return {"loss": 0.0, "f1": 0.0, "rouge_l": 0.0}

    weighted_loss = sum(num_examples * m.get("loss", 0.0) for num_examples, m in metrics_list) / total_examples
    weighted_f1 = sum(num_examples * m.get("f1", 0.0) for num_examples, m in metrics_list) / total_examples
    weighted_rouge = sum(num_examples * m.get("rouge_l", 0.0) for num_examples, m in metrics_list) / total_examples

    return {
        "global_loss": round(weighted_loss, 4),
        "global_f1": round(weighted_f1, 2),
        "global_rouge_l": round(weighted_rouge, 2),
        "total_evaluated_records": total_examples,
    }
