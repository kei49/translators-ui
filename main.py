import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# from scripts.models.t5_small import T5Model
# from scripts.models.opus_mt_tc_big_en_ko import OpusMtTcBigEnKo
# from scripts.models.mbert_large_cc25 import MbertLargeCC25
from scripts.models.opus_mt_ko_en import OpusMtKoEn


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
    
    if t_conf.from_la != "ko" or t_conf.to_la != "en":
        return None
    
    print("loading model")
    model = OpusMtKoEn()
    print("start to inference from: ", t_conf.texts)
    outputs = model.inference(t_conf.texts)
    print("get outputs: ", outputs)
    return outputs


def run_only_once() -> None:
    print("run_only_once: this runs only once when starting the app even with multiple workers of gunicron")
    
    model = OpusMtKoEn()
    outputs = model.inference("오늘 한국어 가르쳐 주시겠어요?")
    print(outputs)
    
run_only_once()