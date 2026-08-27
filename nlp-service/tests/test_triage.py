from app.services.triage_engine import evaluate_triage

def test_triage_red_classification():
    level, reason, score = evaluate_triage("Patient has acute STEMI and severe diaphoresis.")
    assert level == "RED"
    assert score >= 0.90
    assert "STEMI" in reason

def test_triage_yellow_classification():
    level, reason, score = evaluate_triage("Patient with post-chemo neutropenia and mild tachypnea.")
    assert level == "YELLOW"
    assert 0.50 <= score <= 0.85

def test_triage_green_classification():
    level, reason, score = evaluate_triage("Routine medication refill and blood pressure check.")
    assert level == "GREEN"
    assert score <= 0.30
