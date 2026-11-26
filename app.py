import io, zipfile, pathlib
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from pydantic import BaseModel
from agent import AgentManager

load_dotenv()
app = FastAPI(title="Hackathon Judge Agent")
manager = AgentManager()


class Msg(BaseModel):
    user_id: str
    message: str = "Score my code, report and video."


@app.post("/upload/{user_id}/{kind}")  # kind: code(zip) | report | video | image
async def upload(user_id: str, kind: str, filename: str, request: Request):
    """Raw file bytes in the request body (no multipart needed)."""
    base = pathlib.Path("uploads") / user_id
    base.mkdir(parents=True, exist_ok=True)
    data = await request.body()
    if kind == "code":
        zipfile.ZipFile(io.BytesIO(data)).extractall(base / "code")
        return {"saved": str(base / "code")}
    dest = base / f"{kind}{pathlib.Path(filename).suffix}"
    dest.write_bytes(data)
    return {"saved": str(dest)}


@app.post("/chat")
def chat(m: Msg):
    return {"reply": manager.get(m.user_id).chat(m.message)}