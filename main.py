import os
from transformers import AutoTokenizer, AutoModelWithLMHead

from scripts.models.t5_small import T5Model
from scripts.models.opus_mt_tc_big_en_ko import OpusMtTcBigEnKo
from scripts.models.mbert_large_cc25 import MbertLargeCC25
from scripts.models.opus_mt_ko_en import OpusMtKoEn

model = OpusMtKoEn()
model.inference("이번 달에 한국어를 어떻게 하는지 가르쳐 주시겠어요?")
