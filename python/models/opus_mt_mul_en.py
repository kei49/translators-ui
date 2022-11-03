from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from ..helpers import get_directory, check_path_exists
from ..exceptions import InvalidLanguagesError

name = "opus-mt-mul-en"
pretrained_name = f"Helsinki-NLP/{name}"


class OpusMtMulEn():
    originally_available_langs = ['ca', 'es', 'os', 'eo', 'ro', 'fy', 'cy', 'is', 'lb', 'su', 'an', 'sq', 'fr',
                                  'ht', 'rm', 'cv', 'ig', 'am', 'eu', 'tr', 'ps', 'af', 'ny', 'ch', 'uk', 'sl',
                                  'lt', 'tk', 'sg', 'ar', 'lg', 'bg', 'be', 'ka', 'gd', 'ja', 'si', 'br', 'mh', 'km', 'th', 'ty', 'rw', 'te',
                                  'mk', 'or', 'wo', 'kl', 'mr', 'ru', 'yo', 'hu', 'fo', 'zh', 'ti', 'co', 'ee', 'oc', 'sn', 'mt', 'ts', 'pl',
                                  'gl', 'nb', 'bn', 'tt', 'bo', 'lo', 'id', 'gn', 'nv', 'hy', 'kn', 'to', 'io', 'so', 'vi', 'da', 'fj', 'gv',
                                  'sm', 'nl', 'mi', 'pt', 'hi', 'se', 'as', 'ta', 'et', 'kw', 'ga', 'sv', 'ln', 'na', 'mn', 'gu', 'wa', 'lv',
                                  'jv', 'el', 'my', 'ba', 'it', 'hr', 'ur', 'ce', 'nn', 'fi', 'mg', 'rn', 'xh', 'ab', 'de', 'cs', 'he', 'zu', 'yi', 'ml', 'mul', 'en']

    def __init__(self) -> None:
        directory = get_directory(name)

        self.tokenizer = AutoTokenizer.from_pretrained(pretrained_name)

        if not check_path_exists(directory):
            self.model = AutoModelForSeq2SeqLM.from_pretrained(pretrained_name)
            self.model.save_pretrained(directory)
        else:
            self.model = AutoModelForSeq2SeqLM.from_pretrained(directory)

    def set_languages(self, from_la: str, to_la: str) -> None:
        if to_la != "en" or from_la not in self.originally_available_langs:
            raise InvalidLanguagesError()

        src_lang = from_la

        self.tokenizer = AutoTokenizer.from_pretrained(
            pretrained_name)

        self.tokenizer.src_lang = src_lang

    def inference(self, inputs: str = None, max_new_tokens: int = 500, num_beams: int = 1):
        encoded = self.tokenizer(inputs, return_tensors="pt")
        generated_tokens = self.model.generate(
            **encoded,
            max_new_tokens=max_new_tokens,
            num_beams=num_beams)

        outputs = self.tokenizer.batch_decode(
            generated_tokens, skip_special_tokens=True)[0]

        print(outputs)

        return outputs
