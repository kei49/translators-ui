from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from ..helpers import get_directory, check_path_exists

name = "mbart-large-cc25"
pretrained_name = f"facebook/{name}"

class MbertLargeCC25():
    def __init__(self) -> None:
        directory = get_directory(name)

        self.tokenizer = AutoTokenizer.from_pretrained(pretrained_name)

        if not check_path_exists(directory):
            self.model = AutoModelForSeq2SeqLM.from_pretrained(pretrained_name)
            self.model.save_pretrained(directory)
        else:
            self.model = AutoModelForSeq2SeqLM.from_pretrained(directory)

    def inference(self, inputs: str = "Hello, my dog is cute", target_locale: str = "ko_KR"):
        batch = self.tokenizer([inputs], return_tensors="pt")
        generated_ids = self.model.generate(**batch, decoder_start_token_id=self.tokenizer.lang_code_to_id["ko_KR"])
        outputs = self.tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
        
        print(outputs)