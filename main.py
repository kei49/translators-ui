import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from python.translators import Translators


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslateConfig(BaseModel):
    texts: str
    from_la: str
    to_la: str


@app.get("/")
def health_check():
    print(f"{os.getpid()} worker is handling the request")
    return {"message": "Hello World"}


@app.post("/translate/")
def translate(t_conf: TranslateConfig):
    print(f"{os.getpid()} worker is handling the request")

    translator = Translators(t_conf.from_la, t_conf.to_la)
    outputs = translator.inference(t_conf.texts)
    return outputs


def run_only_once() -> None:
    print("run_only_once: this runs only once when starting the app even with multiple workers of gunicron")

    translator = Translators("ko", "en")
    translator.inference(
        "run_only_once: gunicron의 여러 작업자가 있어도 앱을 시작할 때 한 번만 실행됩니다.")


run_only_once()
