# Hackathon Judge Agent

One AI agent (LangChain + Groq) that scores a participant's **code, report, video and image**.
The LLM only understands text, so tools convert every file to text first. Each `user_id` gets its own agent, its own files and its own chat memory.

```
file (zip / pdf / mp4 / png) -> extract_* tool -> text -> agent scores 0-10 -> scores.json
```

## Files

| File | What it does | Teammates need it? |
|---|---|---|
| `agent.py` | `JudgeAgent` (one user) and `AgentManager` (one agent per user) | **Yes** |
| `tools.py` | `extract_code`, `extract_report`, `extract_video`, `extract_image`, `save_score` | **Yes** |
| `app.py` | Ready-made FastAPI server (upload + chat) | Only for Option 1 |
| `requirements.txt` | Dependencies | Yes |
| `.env` | `GROQ_API_KEY=...` (never commit this) | Yes, each person makes their own |

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env        # Windows: copy .env.example .env  -> then add GROQ_API_KEY
uvicorn app:app --reload    # http://127.0.0.1:8000/docs
```

Get a free key at https://console.groq.com

## API

| Endpoint | Body | Use |
|---|---|---|
| `POST /upload/{user_id}/{kind}?filename=<name>` | raw file bytes | Save a submission. `kind` = `code` (zip), `report` (pdf/txt), `video` (mp4/mp3), `image` (png/jpg) |
| `POST /chat` | `{"user_id": "team1", "message": "Score everything"}` | Run the agent. Returns `{"reply": "..."}` |

Scores are saved to `scores.json`:

```json
{ "team1": { "code": {"score": 8, "feedback": "..."}, "report": {"score": 7, "feedback": "..."} } }
```

## Integrate in your backend

### Option 1: call the agent over HTTP (any language)

Run this agent as its own service. Your backend only calls two endpoints.

**Python**
```python
import requests
AGENT = "http://127.0.0.1:8000"

def upload(user_id, kind, path):
    with open(path, "rb") as f:
        requests.post(f"{AGENT}/upload/{user_id}/{kind}",
                      params={"filename": path}, data=f)

def score(user_id, message="Score my code, report and video."):
    r = requests.post(f"{AGENT}/chat", json={"user_id": user_id, "message": message})
    return r.json()["reply"]

upload("team1", "code", "code.zip")
upload("team1", "report", "report.pdf")
print(score("team1"))
```

**Node.js**
```js
const AGENT = "http://127.0.0.1:8000";
await fetch(`${AGENT}/upload/team1/report?filename=report.pdf`, { method: "POST", body: fs.readFileSync("report.pdf") });
const res = await fetch(`${AGENT}/chat`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ user_id: "team1", message: "Score everything" }),
});
console.log((await res.json()).reply);
```

### Option 2: import it directly (Python backend)

Copy `agent.py` and `tools.py` into your backend project, install `requirements.txt`, and add `GROQ_API_KEY` to your `.env`.

```python
from dotenv import load_dotenv
from agent import AgentManager

load_dotenv()
manager = AgentManager()          # create ONCE at startup

# inside any route / function:
reply = manager.get(user_id).chat("Score my code, report and video.")
```

Save the user's files before calling it, using exactly these paths:

```
uploads/<user_id>/code/...      <- unzipped source code
uploads/<user_id>/report.pdf    (or report.txt)
uploads/<user_id>/video.mp4     (or video.mp3)
uploads/<user_id>/image.png     (or image.jpg)
```

Example in an existing FastAPI backend:
```python
from fastapi import FastAPI
from agent import AgentManager

app = FastAPI()
manager = AgentManager()

@app.post("/judge/{user_id}")
def judge(user_id: str):
    return {"reply": manager.get(user_id).chat("Score everything")}
```

## Add a new tool

Write one function in `tools.py` with `@extractor`. Nothing else changes.

```python
@extractor
def extract_github(base):
    """Get the README and commit count of the participant's GitHub repo."""
    return "text here"          # base = Path("uploads/<user_id>")
```

The LLM reads the docstring to decide when to use the tool, so describe it clearly.

## Notes

- Run with **one worker**. Chat memory lives in RAM, so `--workers 2` would give each user two different memories.
- Memory resets when the server restarts. For production, use a database checkpointer (for example `PostgresSaver`).
- Groq Whisper accepts video/audio up to about 25MB.
- Groq's free tier has rate limits. If you get 429 errors, wait a bit or use a smaller model.
- Never commit `.env`, `uploads/` or `scores.json`.