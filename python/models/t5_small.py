from transformers import AutoTokenizer, AutoModelWithLMHead

from ..helpers import get_directory, check_path_exists

NAME = "t5-small"

class T5Model():
    def __init__(self) -> None:
        name = NAME
        directory = get_directory(name)

        self.tokenizer = AutoTokenizer.from_pretrained(name)

        if not check_path_exists(directory):
            self.model = AutoModelWithLMHead.from_pretrained(name)
            self.model.save_pretrained(directory)
        else:
            self.model = AutoModelWithLMHead.from_pretrained(directory)

    def inference(self, inputs: str = "Hello, my dog is cute"):
        input_ids = self.tokenizer(inputs, return_tensors="pt").input_ids
        outputs = self.model.generate(input_ids)
        print(self.tokenizer.decode(outputs[0], skip_special_tokens=True))
