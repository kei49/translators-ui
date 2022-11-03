import React, { useState } from 'react';
import { Textarea, Icon } from '@chakra-ui/react'
import { Box, VStack } from '@chakra-ui/react'

import { TbSwitchHorizontal } from "react-icons/tb";
import { toast } from 'react-toastify';

import LanguageSelector from '../components/LanguageSelector';
import InputTextarea from '../components/InputTextarea';
import { useTranslate } from '../hooks/useTranslate';

function MainPage() {
    const [fromLanguage, setFromLanguage] = useState<string>("ko");
    const [toLanguage, setToLanguage] = useState<string>("en");
    const [inputTexts, setInputTexts] = useState<string>("");
    const [outputTexts, setOutputTexts] = useState<string>("");

    const availableLanguages = ["en", "es", "fr", "it", "ja", "ko", "ru", "vi", "zh", "id", "pl", "th"]
    const availableFromLanguages = availableLanguages;
    const availableTolanguages = availableLanguages;

    useTranslate({
        params: {
            texts: inputTexts,
            fromLanguage,
            toLanguage
        },
        returnResults: (texts: string) => setOutputTexts(texts)
    });

    const switchLanguages = () => {
        if ((availableFromLanguages.includes(toLanguage) && availableTolanguages.includes(fromLanguage))) {
            setFromLanguage(toLanguage);
            // setToLanguage(fromLanguage);
            setInputTexts(outputTexts);
        } else {
            toast.warning("Sorry, the pair of the selected languages are not available");
        }
    }

    const handleOneLanugageUpdate = (la: string, isFrom: boolean) => {
        console.log("@@@@ calling udpates", la, isFrom);
        if (isFrom) {
            setFromLanguage(la);
            setInputTexts("");
        } else {
            setToLanguage(la);
        }
        
        setOutputTexts("");
    }

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <Box display="flex">
                <VStack w="100%" ml="50px">
                    <LanguageSelector languages={availableFromLanguages} value={fromLanguage} handleUpdate={(la) => handleOneLanugageUpdate(la, true)} />
                    <InputTextarea texts={inputTexts} handleUpdate={(texts) => setInputTexts(texts)} />
                </VStack>
                <Icon as={TbSwitchHorizontal} pt="8px" w={{ base: "10%", md: "5%",xl: "5%" }} h={8} color="white" onClick={switchLanguages} />
                <VStack w="100%" mr="50px">
                    <LanguageSelector languages={availableTolanguages} value={toLanguage} handleUpdate={(la) => handleOneLanugageUpdate(la, false)} />
                    <Textarea value={outputTexts} readOnly h="200px" placeholder='Translated texts will be displayed here' color="white" />
                </VStack>
            </Box>
        </Box>
    )
}

export default MainPage;