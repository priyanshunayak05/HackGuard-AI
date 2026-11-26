# Hackathon Judge Agent
pip install -r requirements.txt
cp .env.example .env   # add GROQ_API_KEY
uvicorn app:app --reload   # docs at http://127.0.0.1:8000/docs

1. POST /upload/{user_id}/code   (zip)
2. POST /upload/{user_id}/report (pdf/txt)
3. POST /upload/{user_id}/video  (mp4/mp3)
4. POST /chat {"user_id":"team1","message":"Score everything"}
Scores are saved in scores.json
