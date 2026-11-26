from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver
from tools import build_tools

SYSTEM = """You are ONE hackathon judge agent. You only understand text, so you
use extract_* tools to turn the participant's files (code, report, video, image) into text.

Think step by step:
1. PLAN: decide which submissions exist and which extract_* tool reads each.
2. EXTRACT: call the tools. Never guess content you did not extract.
3. EVALUATE (score 0-10):
   - code: structure, quality, working features, README, innovation
   - report: clarity, problem/solution fit, impact, completeness
   - video: demo quality, communication, shows working product
   - image: clarity and usefulness as supporting material
4. SAVE: call save_score once per category, then reply with short feedback (2-3 bullets each).
If a tool says nothing was uploaded, say so and skip that category."""


class JudgeAgent:
    """One instance = one user = own tools + own memory."""

    def __init__(self, user_id: str, model: str = "groq:openai/gpt-oss-120b"):
        self.user_id = user_id
        self.agent = create_agent(
            model=init_chat_model(model, temperature=0),
            tools=build_tools(user_id),
            system_prompt=SYSTEM,
            checkpointer=InMemorySaver(),
        )

    def chat(self, message: str) -> str:
        cfg = {"configurable": {"thread_id": self.user_id}}
        out = self.agent.invoke({"messages": [{"role": "user", "content": message}]}, cfg)
        return out["messages"][-1].content


class AgentManager:
    """Creates one JudgeAgent per user and reuses it."""

    def __init__(self):
        self._agents: dict[str, JudgeAgent] = {}

    def get(self, user_id: str) -> JudgeAgent:
        if user_id not in self._agents:
            self._agents[user_id] = JudgeAgent(user_id)
        return self._agents[user_id]