from dataclasses import dataclass
from enum import Enum, auto
from python.models.opus_mt_ko_en import OpusMtKoEn
from python.models.mbert_large_50 import MBartLargeManyToMany
# from python.models.mbert_large_cc25 import MbertLargeCC25
import torch

class ModelType(Enum):
    OPUS_MT_KO_EN = auto()
    MBART_LARGE_MANY_TO_MANY = auto()


class Translators():
    supported_la = ["en", "es", "fr", "it", "ja",
                    "ko", "ru", "vi", "zh", "id", "pl", "th"]
    use_gpu = torch.cuda.is_available()
    

    def __init__(self, model_type: ModelType) -> None:
        self.model_type = model_type
        self._load_model()

    def _load_model(self) -> None:
        print("loading model")
        match self.model_type:
            case ModelType.OPUS_MT_KO_EN:
                self.model = OpusMtKoEn()
            case ModelType.MBART_LARGE_MANY_TO_MANY:
                self.model = MBartLargeManyToMany(use_gpu=self.use_gpu)
            case _:
                pass

    def set_languages(self, from_la: str, to_la: str) -> None:
        if self.model and from_la in self.supported_la and to_la in self.supported_la:
            match self.model_type:
                case ModelType.OPUS_MT_KO_EN:
                    pass
                case ModelType.MBART_LARGE_MANY_TO_MANY:
                    self.model.set_languages(from_la, to_la)
                case _:
                    pass
        else:
            raise Exception("failed to load models: please check languages")

    def inference(self, texts) -> str:
        if self.model:
            print("start to inference from: ", texts)
            outputs = self.model.inference(texts)
            print("get outputs: ", outputs)
            return outputs
        return
