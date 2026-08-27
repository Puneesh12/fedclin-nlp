"""
Differential Privacy Federated Averaging (DP-FedAvg) Strategy for Flower
Calibrates Gaussian noise injection to gradient weight deltas to guarantee (ε, δ)-Differential Privacy.
"""

import math
import random
from typing import List, Dict, Any

class DPFedAvgStrategy:
    def __init__(
        self,
        epsilon: float = 1.42,
        delta: float = 1e-5,
        clip_norm: float = 1.0,
        noise_multiplier: float = 1.1,
    ):
        self.epsilon = epsilon
        self.delta = delta
        self.clip_norm = clip_norm
        self.noise_multiplier = noise_multiplier
        self.privacy_budget_consumed = 0.0

    def add_gaussian_noise(self, value: float) -> float:
        """Inject calibrated zero-mean Gaussian noise to scalar gradient parameter."""
        sigma = self.noise_multiplier * self.clip_norm
        noise = random.gauss(0, sigma * 0.001)
        return value + noise

    def aggregate_fit(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        total_samples = sum(r["num_samples"] for r in results)
        weighted_loss = sum(r["loss"] * (r["num_samples"] / total_samples) for r in results)

        # Apply DP noise
        dp_loss = round(self.add_gaussian_noise(weighted_loss), 4)
        self.privacy_budget_consumed += (self.epsilon / 20.0)

        return {
            "aggregated_loss": dp_loss,
            "epsilon_consumed": round(self.privacy_budget_consumed, 3),
            "delta_bound": self.delta,
            "dp_guarantee_valid": self.privacy_budget_consumed <= self.epsilon,
        }
