#!/bin/bash
set -e

echo "=== Running Full FedClinNLP Automated Test Suite ==="

echo "1. Frontend Build Verification..."
npm --prefix frontend run build

echo "2. Non-IID Dirichlet Partitioning Execution..."
python3 federated-learning/partitioning/partition_data.py

echo "3. Research Experiment Pipeline..."
python3 research/experiments/experiment_runner.py

echo "4. Empirical Parity Calculation..."
python3 research/benchmarks/evaluate_parity.py

echo "=== All FedClinNLP Verification Steps Passed Successfully! ==="
