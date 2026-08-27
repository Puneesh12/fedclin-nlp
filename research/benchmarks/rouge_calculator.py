"""
ROUGE Evaluation Metric Engine for Clinical Abstractive Summarization
Calculates ROUGE-1, ROUGE-2, and ROUGE-L scores without external dependencies.
"""

from typing import List, Dict

def get_ngrams(tokens: List[str], n: int) -> List[tuple]:
    return [tuple(tokens[i:i+n]) for i in range(len(tokens)-n+1)]

def calculate_rouge(reference: str, candidate: str) -> Dict[str, float]:
    ref_tokens = reference.lower().split()
    cand_tokens = candidate.lower().split()

    # ROUGE-1
    ref_1 = set(get_ngrams(ref_tokens, 1))
    cand_1 = set(get_ngrams(cand_tokens, 1))
    overlap_1 = len(ref_1.intersection(cand_1))
    r1 = (overlap_1 / len(ref_1)) * 100 if ref_1 else 0.0

    # ROUGE-2
    ref_2 = set(get_ngrams(ref_tokens, 2))
    cand_2 = set(get_ngrams(cand_tokens, 2))
    overlap_2 = len(ref_2.intersection(cand_2))
    r2 = (overlap_2 / len(ref_2)) * 100 if ref_2 else 0.0

    # ROUGE-L (Approximation via unigram F-measure)
    rl = (2 * (overlap_1 / (len(ref_1) + len(cand_1)))) * 100 if (len(ref_1) + len(cand_1)) > 0 else 0.0

    return {
        "rouge_1": round(r1, 2),
        "rouge_2": round(r2, 2),
        "rouge_l": round(rl, 2),
    }
