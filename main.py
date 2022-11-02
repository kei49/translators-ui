import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import copy

from python.translators import Translators, ModelType



app = FastAPI()

origins = [
    "*"
    # "http://localhost:3000",
    # "https://*.jp.ngrok.io"
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


opus_mt_ko_en_model = Translators(ModelType.OPUS_MT_KO_EN)
mbart_large_mm_model = Translators(ModelType.MBART_LARGE_MANY_TO_MANY)


@app.get("/")
def health_check():
    print(f"{os.getpid()} worker is handling the request")
    return {"message": "Hello World"}


@app.post("/translate/")
def translate(t_conf: TranslateConfig):
    print(f"{os.getpid()} worker is handling the request")
    
    if t_conf.from_la == "ko" and t_conf.to_la == "en":
        translator = copy.deepcopy(opus_mt_ko_en_model)
    else:
        translator = copy.deepcopy(mbart_large_mm_model)
        translator.set_languages(t_conf.from_la, t_conf.to_la)
    
    outputs = translator.inference(t_conf.texts)
    return outputs


def run_only_once() -> None:
    print("run_only_once: this runs only once when starting the app even with multiple workers of gunicron")


run_only_once()
