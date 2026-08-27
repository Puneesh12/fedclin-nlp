"""
Gradient Norm Clipping Utility for Local Hospital Clients
Prevents model poisoning and memorization of outlier patient EHR notes.
"""

import math
from typing import List

def clip_gradient_norm(gradients: List[float], max_norm: float = 1.0) -> List[float]:
    """Clips gradients to L2 norm ceiling of max_norm."""
    total_norm = math.sqrt(sum(g ** 2 for g in gradients))
    clip_coef = max_norm / (total_norm + 1e-6)

    if clip_coef < 1.0:
        return [g * clip_coef for g in gradients]
    return gradients
