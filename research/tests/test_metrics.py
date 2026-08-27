from benchmarks.rouge_calculator import calculate_rouge
from benchmarks.f1_calculator import calculate_ner_metrics
from benchmarks.communication_model import compare_communication_costs

def test_rouge_calculation():
    ref = "Patient diagnosed with STEMI and acute chest pain"
    cand = "Patient diagnosed with acute STEMI"
    metrics = calculate_rouge(ref, cand)
    assert metrics["rouge_1"] > 0
    assert metrics["rouge_l"] > 0

def test_f1_ner_calculation():
    true_entities = ["chest pain", "troponin", "stemi"]
    pred_entities = ["chest pain", "troponin"]
    metrics = calculate_ner_metrics(true_entities, pred_entities)
    assert metrics["precision"] == 100.0
    assert metrics["recall"] == 66.67
    assert metrics["f1_score"] == 80.0

def test_communication_comparison():
    res = compare_communication_costs()
    assert res["raw_patient_data_egress_mb"] == 0.0
    assert res["centralized_raw_data_transmitted_mb"] > 1000.0
    assert res["federated_weight_deltas_transmitted_mb"] < 100.0
