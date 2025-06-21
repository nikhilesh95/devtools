from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from run_project import run_docker

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/run/json-helper")
async def run_json_helper(request: Request):
    data = await request.json()
    result = run_docker("json-helper", data)
    return result