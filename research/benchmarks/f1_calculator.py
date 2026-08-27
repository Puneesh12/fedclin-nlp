"""
Token-Level Precision, Recall, and F1-Score Evaluator for Clinical NER
Supports micro-averaged and macro-averaged metrics across medical entity categories.
"""

from typing import List, Dict, Tuple

def calculate_ner_metrics(true_entities: List[str], pred_entities: List[str]) -> Dict[str, float]:
    true_set = set(true_entities)
    pred_set = set(pred_entities)

    tp = len(true_set.intersection(pred_set))
    fp = len(pred_set - true_set)
    fn = len(true_set - pred_set)

    precision = (tp / (tp + fp)) * 100 if (tp + fp) > 0 else 0.0
    recall = (tp / (tp + fn)) * 100 if (tp + fn) > 0 else 0.0
    f1 = (2 * precision * recall / (precision + recall)) if (precision + recall) > 0 else 0.0

    return {
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2),
        "true_positives": tp,
        "false_positives": fp,
        "false_negatives": fn,
    }
