import React, { useState } from 'react';
import { Textarea, Icon } from '@chakra-ui/react'
import { Box, HStack, VStack } from '@chakra-ui/react'

import { TbSwitchHorizontal } from "react-icons/tb";
import { toast } from 'react-toastify';

import LanguageSelector from '../components/LanguageSelector';
import InputTextarea from '../components/InputTextarea';
import { translate } from '../apis/translate';

function MainPage() {
    const [fromLanguage, setFromLanguage] = useState<string>("ko");
    const [toLanguage, setToLanguage] = useState<string>("en");
    const [inputTexts, setInputTexts] = useState<string>("");
    const [outputTexts, setOutputTexts] = useState<string>("");

    const availableLanguages = ["en", "es", "fr", "it", "ja", "ko", "ru", "vi", "zh", "id", "pl", "th"]
    const availableFromLanguages = availableLanguages;
    const availableTolanguages = availableLanguages;


    const callTranslate = (texts: string) => {
        (async () => {
            setInputTexts(texts);

            const results = await translate(texts, fromLanguage, toLanguage);
            console.log("results: ", results);
            setOutputTexts(results);
        })()
    }

    const switchLanguages = () => {
        if ((availableFromLanguages.includes(toLanguage) && availableTolanguages.includes(fromLanguage))) {
            setFromLanguage(toLanguage);
            setToLanguage(fromLanguage);
            setInputTexts(outputTexts);
        } else {
            toast.warning("Sorry, the pair of the selected languages are not available");
        }
    }

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <HStack spacing='10px' justifyContent="center">
                <VStack spacing={0}>
                    <LanguageSelector languages={availableFromLanguages} value={fromLanguage} handleUpdate={(la) => setFromLanguage(la)} />
                    <InputTextarea texts={inputTexts} handleUpdate={(texts) => callTranslate(texts)} />
                </VStack>
                <Icon as={TbSwitchHorizontal} w={8} h={8} color="white" onClick={switchLanguages} />
                <VStack spacing={0}>
                    <LanguageSelector languages={availableTolanguages} value={toLanguage} handleUpdate={(la) => setToLanguage(la)} />
                    <Textarea value={outputTexts} readOnly h="200px" placeholder='Translated texts will be displayed here' color="white" />
                </VStack>
            </HStack>
        </Box>
    )
}

export default MainPage;