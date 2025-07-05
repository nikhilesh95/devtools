# ================================
# DevTools Project Makefile 
# ================================
# Usage:
#   make create-venv       → Set up virtual environment and install deps
#   make start-backend     → Run FastAPI backend locally at http://localhost:8000
#   make start-frontend    → Start static frontend at http://localhost:5500
#   make clean-venv        → Remove backend virtual environment
# ================================

create-venv:
	@echo "📦 Creating virtual environment..."
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

start-backend:
	@echo "🚀 Starting backend server at http://localhost:8000"
	cd backend && source venv/bin/activate && uvicorn app:app --reload --host 0.0.0.0 --port 8000

start-frontend:
	@echo "🌐 Starting frontend at http://localhost:5500"
	cd docs && python3 -m http.server 5500

clean-venv:
	@echo "🧹 Cleaning virtual environment..."
	rm -rf backend/venv
