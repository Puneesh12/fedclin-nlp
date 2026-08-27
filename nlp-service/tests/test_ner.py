from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_stemi_ner_extraction():
    payload = {
        "raw_clinical_note": "Patient presents with crushing chest pain, diaphoresis, and troponin elevation. STEMI diagnosed. Administered aspirin."
    }
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()

    assert data["triage"]["level"] == "RED"
    assert len(data["entities"]) >= 3

    categories = [e["category"] for e in data["entities"]]
    assert "symptom" in categories
    assert "diagnosis" in categories

def test_oncology_ner_extraction():
    payload = {
        "raw_clinical_note": "Post-chemotherapy fever 38.6C with neutropenia. Administered cefepime."
    }
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()

    assert data["triage"]["level"] == "YELLOW"
    assert any(e["text"] == "neutropenia" for e in data["entities"])
