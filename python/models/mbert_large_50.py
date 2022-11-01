

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from ..helpers import get_directory, check_path_exists

NAME = "mbart-large-50"

class T5Model():
    def __init__(self) -> None:
        name = NAME
        pretrined_name = f"facebook/{name}"
        directory = get_directory(name)

        self.tokenizer = AutoTokenizer.from_pretrained(pretrined_name)

        if not check_path_exists(directory):
            self.model = AutoModelForSeq2SeqLM.from_pretrained(pretrined_name)
            self.model.save_pretrained(directory)
        else:
            self.model = AutoModelForSeq2SeqLM.from_pretrained(directory)

    def inference(self, inputs: str = "Hello, my dog is cute"):
        input_ids = self.tokenizer(inputs, return_tensors="pt").input_ids
        outputs = self.model.generate(input_ids)
        print(self.tokenizer.decode(outputs[0], skip_special_tokens=True))
