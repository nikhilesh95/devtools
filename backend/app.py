from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/hello")
async def ping():
    return {"status": "alive"}

@app.post("/run/json-helper")
async def json_helper(request: Request):
    try:
        body = await request.json()
        text = body.get("input", "")
        action = body.get("action", "validate")

        if action == "validate":
            # Try parsing JSON
            json.loads(text)
            return {"result": "Valid JSON ✅"}

        elif action == "beautify":
            parsed = json.loads(text)
            return {"result": json.dumps(parsed, indent=2)}

        elif action in ("minify", "compress"):
            parsed = json.loads(text)
            return {"result": json.dumps(parsed, separators=(",", ":"))}

        else:
            return JSONResponse(status_code=400, content={"error": f"Unknown action: {action}"})

    except json.JSONDecodeError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
