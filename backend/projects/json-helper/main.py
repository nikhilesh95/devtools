import sys
import json

def validate_json(text):
    try:
        json.loads(text)
        return {"result": "Valid JSON"}
    except json.JSONDecodeError as e:
        return {"error": str(e)}

def beautify_json(text):
    try:
        parsed = json.loads(text)
        return {"result": json.dumps(parsed, indent=2)}
    except json.JSONDecodeError as e:
        return {"error": str(e)}
    
def minify_json(text):
    try:
        parsed = json.loads(text)
        return {"result": json.dumps(parsed, separators=(",", ":"))}
    except json.JSONDecodeError as e:
        return {"error": str(e)}


def main():
    data = json.load(sys.stdin)
    text = data.get("input", "")
    action = data.get("action", "validate")

    if action == "validate":
        print(json.dumps(validate_json(text)))
    elif action == "beautify":
        print(json.dumps(beautify_json(text)))
    elif action == "minify":
        print(json.dumps(minify_json(text)))
    else:
        print(json.dumps({"error": f"Unknown action: {action}"}))

if __name__ == "__main__":
    main()
