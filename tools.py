"""
The LLM only understands TEXT. Every tool here turns a file into text.

ADD A NEW TOOL = write one function below with @extractor. Nothing else to change.
    @extractor
    def extract_xyz(base):
        '''Describe what it does (the LLM reads this).'''
        return "text"
"""
import base64, json, pathlib
from groq import Groq
from pypdf import PdfReader
from langchain_core.tools import StructuredTool

UPLOADS = pathlib.Path("uploads")
SCORES = pathlib.Path("scores.json")
CODE_EXT = {".py", ".js", ".ts", ".java", ".cpp", ".go", ".md", ".html", ".css", ".json"}
LIMIT = 12000  # max characters sent back to the LLM

EXTRACTORS = []


def extractor(fn):
    """Decorator: register a function(base_folder) -> text as an agent tool."""
    EXTRACTORS.append(fn)
    return fn


def _find(base, name):
    return next(iter(sorted(base.glob(f"{name}.*"))), None)


# ---------- normal tools: file -> text ----------
@extractor
def extract_code(base):
    """Get the file tree and contents of the participant's source code as text."""
    files = [p for p in (base / "code").rglob("*") if p.is_file() and p.suffix in CODE_EXT]
    if not files:
        return "No code uploaded."
    out = "FILES:\n" + "\n".join(str(p.relative_to(base)) for p in files[:50]) + "\n\n"
    for p in files[:15]:
        out += f"--- {p.name} ---\n{p.read_text(errors='ignore')[:1500]}\n"
    return out[:LIMIT]


@extractor
def extract_report(base):
    """Get the text of the participant's report (PDF or txt)."""
    f = _find(base, "report")
    if not f:
        return "No report uploaded."
    if f.suffix == ".pdf":
        return "\n".join(p.extract_text() or "" for p in PdfReader(f).pages)[:LIMIT]
    return f.read_text(errors="ignore")[:LIMIT]


@extractor
def extract_video(base):
    """Get the spoken transcript of the participant's demo video/audio."""
    f = _find(base, "video")
    if not f:
        return "No video uploaded."
    res = Groq().audio.transcriptions.create(
        file=(f.name, f.read_bytes()), model="whisper-large-v3-turbo"
    )
    return res.text[:LIMIT]


@extractor
def extract_image(base):
    """Describe a screenshot/diagram image and read any text in it."""
    f = _find(base, "image")
    if not f:
        return "No image uploaded."
    b64 = base64.b64encode(f.read_bytes()).decode()
    res = Groq().chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{"role": "user", "content": [
            {"type": "text", "text": "Describe this image in detail and transcribe all visible text."},
            {"type": "image_url", "image_url": {"url": f"data:image/{f.suffix[1:]};base64,{b64}"}},
        ]}],
    )
    return res.choices[0].message.content[:LIMIT]


# ---------- build per-user tool list ----------
def build_tools(user_id: str):
    base = UPLOADS / user_id

    def wrap(fn):
        return StructuredTool.from_function(
            func=lambda: fn(base), name=fn.__name__, description=fn.__doc__
        )

    def save_score(category: str, score: int, feedback: str) -> str:
        """Save final score. category: code|report|video|image. score: 0-10."""
        data = json.loads(SCORES.read_text()) if SCORES.exists() else {}
        data.setdefault(user_id, {})[category] = {"score": score, "feedback": feedback}
        SCORES.write_text(json.dumps(data, indent=2))
        return f"Saved {category}={score}"

    return [wrap(fn) for fn in EXTRACTORS] + [StructuredTool.from_function(save_score)]