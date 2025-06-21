# ==============================================================================
# Dev Workflow Makefile for Modular GitHub Pages + FastAPI + Podman App Runner
# ==============================================================================

# USAGE:
#
#   make setup-backend      # One-time setup to create virtualenv and install deps
#   make                    # Rebuild all containers and start both backend & frontend
#   make build-projects     # Just rebuild project containers
#   make start-backend      # Start FastAPI backend (http://localhost:8000)
#   make start-frontend     # Start static HTML server (http://localhost:5500)
#   make clean              # Remove all built Podman images (manual use)

# NOTES:
# - All project containers live in: backend/projects/<project-name>/
# - Each project has its own Dockerfile and language/runtime
# - The backend runs locally and spawns containers via Podman
# - Frontend served separately via Python static file server
# - Make sure Podman is installed and aliased as `docker` OR update scripts to use `podman`

# TIPS:
# - Open two terminals: one for backend, one for frontend
# - Rebuild only changed projects manually via `podman build -t <name> <path>`
# - Use `curl` or JS fetch to call: POST http://localhost:8000/run/<project-name>

# Note: just do "make start-backend" and then "make" in one terminal
# and "make start-frontend" in another

# ==============================================================================

# Run all services: rebuild project containers and start both backend & frontend
all: build-projects start-backend start-frontend

# Build each project container under backend/projects/*
build-projects:
	@echo "🔨 Building all Podman project containers..."
	@for dir in backend/projects/*/ ; do \
		project=$$(basename $$dir); \
		echo "→ Building $$project..."; \
		podman build -t $$project $$dir || exit 1; \
	done

# Start FastAPI backend on localhost:8000
start-backend:
	@echo "🚀 Starting backend server at http://localhost:8000"
	cd backend && source venv/bin/activate && uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Start frontend static HTML server on localhost:5500
start-frontend:
	@echo "🌐 Starting frontend server at http://localhost:5500"
	cd frontend && python3 -m http.server 5500

# One-time setup: create virtual environment and install requirements
setup-backend:
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# Remove all Podman images for the project
clean:
	@echo "🧹 Cleaning all built containers..."
	@for dir in backend/projects/*/ ; do \
		project=$$(basename $$dir); \
		podman rmi $$project || true; \
	done
