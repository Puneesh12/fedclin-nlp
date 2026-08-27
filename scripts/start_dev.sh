#!/bin/bash
set -e

echo "=== Starting FedClinNLP Local Services ==="

echo "1. Launching Node.js Express API (Port 5050)..."
(cd backend && npm start) &

echo "2. Launching Python FastAPI NLP Service (Port 8000)..."
(cd nlp-service && uvicorn app.main:app --port 8000) &

echo "3. Launching React Vite Frontend (Port 5173)..."
(cd frontend && npm run dev) &

echo "All services initiated. Visit http://localhost:5173"
wait
