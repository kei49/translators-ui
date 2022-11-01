from python.models.opus_mt_ko_en import OpusMtKoEn
from python.models.mbert_large_50 import MBartLargeManyToMany
# from python.models.mbert_large_cc25 import MbertLargeCC25


class Translators():
    supported_la = ["en", "es", "fr", "it", "ja",
                    "ko", "ru", "vi", "zh", "id", "pl", "th"]

    def __init__(self, from_la, to_la) -> None:
        print("loading model")
        if from_la == "ko" and to_la == "en":
            self.model = OpusMtKoEn()
        elif from_la in self.supported_la and to_la in self.supported_la:
            # self.model = MbertLargeCC25(to_la)
            self.model = MBartLargeManyToMany(from_la, to_la)
            print("loaded MBartLargeManyToMany", self.model)
        else:
            raise Exception("failed to load models: please check languages")

    def inference(self, texts) -> str:
        if self.model:
            print("start to inference from: ", texts)
            outputs = self.model.inference(texts)
            print("get outputs: ", outputs)
            return outputs
        return
