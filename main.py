from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Chat(BaseModel):
    id:int
    content:str

chats=[]

app = FastAPI()

@app.post("/chats")
def create_memo(chat:Chat):
    chats.append(chat)
    return "success"

@app.get("/chats")
def read_chat():
    return chats;



app.mount("/", StaticFiles(directory="static", html=True), name="static")


