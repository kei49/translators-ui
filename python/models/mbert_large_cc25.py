from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from ..helpers import get_directory, check_path_exists

name = "mbart-large-cc25"
pretrained_name = f"facebook/{name}"

"""_summary_

Generate sequential texts from input texts
"""


class MbertLargeCC25():
    available_target_langs = [
        "ar_AR", "cs_CZ", "de_DE", "en_XX", "es_XX", "et_EE",
        "fi_FI", "fr_XX", "gu_IN", "hi_IN", "it_IT", "ja_XX", "kk_KZ", "ko_KR", "lt_LT",
        "lv_LV", "my_MM", "ne_NP", "nl_XX", "ro_RO", "ru_RU", "si_LK", "tr_TR", "vi_VN", "zh_CN"]

    def __init__(self, target_locale: str) -> None:
        directory = get_directory(name)

        target_langs = [
            la for la in self.available_target_langs if target_locale in la]
        if len(target_langs) == 0:
            return None

        self.target_lang = target_langs[0]

        self.tokenizer = AutoTokenizer.from_pretrained(pretrained_name)

        if not check_path_exists(directory):
            self.model = AutoModelForSeq2SeqLM.from_pretrained(pretrained_name)
            self.model.save_pretrained(directory)
        else:
            self.model = AutoModelForSeq2SeqLM.from_pretrained(directory)

    def inference(self, inputs: str = "Hello, my dog is cute"):
        batch = self.tokenizer([inputs], return_tensors="pt")
        generated_ids = self.model.generate(
            **batch, decoder_start_token_id=self.tokenizer.lang_code_to_id[self.target_lang])
        outputs = self.tokenizer.batch_decode(
            generated_ids, skip_special_tokens=True)[0]

        return outputs
