import subprocess
import json

def run_docker(project_name: str, input_data: dict) -> dict:
    import subprocess, json
    input_json = json.dumps(input_data).encode()
    try:
        result = subprocess.run(
            ["podman", "run", "--rm", "-i", project_name],
            input=input_json,
            capture_output=True,
            timeout=10
        )
        stdout = result.stdout.decode()
        stderr = result.stderr.decode()
        print("=== STDOUT ===")
        print(stdout)
        print("=== STDERR ===")
        print(stderr)
        return json.loads(stdout)
    except Exception as e:
        return {"error": str(e)}
