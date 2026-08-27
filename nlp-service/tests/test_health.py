from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert "distilbert-bio" in data["model_loaded"]
    assert "timestamp" in data

def test_model_info_endpoint():
    response = client.get("/model")
    assert response.status_code == 200
    data = response.json()
    assert "DistilBERT-Bio" in data["architecture"]
    assert data["global_f1"] >= 0.90
    assert "symptom" in data["supported_entities"]
