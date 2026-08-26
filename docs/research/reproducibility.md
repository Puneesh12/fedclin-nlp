# Research Reproducibility Guide — FedClinNLP

This guide provides step-by-step instructions to reproduce the experimental benchmarks comparing centralized clinical NLP training against decentralized Federated Averaging (`FedAvg`) across heterogeneous Non-IID partitions.

---

## 1. Experimental Setup & Configuration

All hyperparameters are centrally managed in `federated-learning/configs/experiment_config.yaml`:
- **Model Architecture**: `DistilBERT-Bio` (6 layers, 768 hidden dimension, 12 attention heads, 66.4M parameters)
- **Token Classification Head**: 5 NER classes (`symptom`, `medication`, `diagnosis`, `procedure`, `lab_value`)
- **Sequence Classification Head**: 3 Triage classes (`RED`, `YELLOW`, `GREEN`)
- **Federated Strategy**: `FedAvg` across $K = 3$ simulated hospital nodes
- **Dataset Partitioning**: Dirichlet non-IID skew ($\alpha = 0.5$, Random Seed = 42)
- **Differential Privacy**: $\epsilon = 1.42$, $\delta = 10^{-5}$, $C = 1.0$

---

## 2. Reproducing Dataset Partitioning

Execute the deterministic Non-IID partitioner:

```bash
python3 federated-learning/partitioning/partition_data.py
```

This outputs the exact sample allocation:
- **Hospital Node A (Cardiology Hub)**: 18,298 EHRs (68% Cardiology, 20% General Med, 12% Oncology)
- **Hospital Node B (Cancer Center)**: 14,417 EHRs (72% Oncology, 18% General Med, 10% Cardiology)
- **Hospital Node C (Metropolitan General)**: 22,734 EHRs (55% General Med, 25% Cardiology, 20% Oncology)

---

## 3. Running Federated Training Simulation

Launch the Flower FL coordinator and hospital clients:

```bash
# Terminal 1: Start Flower Server
python3 federated-learning/server/flower_server.py

# Terminal 2: Execute Client Training Simulation
python3 federated-learning/clients/hospital_client.py
```

---

## 4. Running Benchmark Evaluation

To execute the automated evaluation pipeline and generate the empirical parity metrics:

```bash
python3 research/experiments/experiment_runner.py
python3 research/benchmarks/evaluate_parity.py
```

### Expected Output
```text
=== Experiment EXP-FED-0826-A Completed ===
Centralized F1: 92.4%
Federated F1:   91.2%
Empirical Parity: 98.70%
Raw Data Transmitted: 0.0 MB (100% On-Premise Retention)
```
