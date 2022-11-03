import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from python.translator.manager import Manager, ModelType, TranslateParams


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


class TranslateRequestParams(BaseModel):
    texts: str
    from_la: str
    to_la: str


manager = Manager()


@app.get("/")
def health_check():
    print(f"{os.getpid()} worker is handling the request")
    return {"message": "Hello World"}


@app.post("/translate/")
def translate(req: TranslateRequestParams):
    print(f"{os.getpid()} worker is handling the request")

    if req.from_la == "ko" and req.to_la == "en":
        t_p = TranslateParams(ModelType.OPUS_MT_KO_EN, req.from_la, req.to_la)
    elif req.to_la == "en":
        t_p = TranslateParams(ModelType.OPUS_MT_MUL_EN, req.from_la, req.to_la)
    else:
        t_p = TranslateParams(
            ModelType.MBART_LARGE_MANY_TO_MANY, req.from_la, req.to_la)

    translator = manager.get_model(t_p)

    outputs = translator.inference(req.texts)
    return outputs


def run_only_once() -> None:
    print("Application is ready now!")


run_only_once()
