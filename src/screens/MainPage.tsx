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
    const [outputTexts, setOutputTexts] = useState<string>("");

    const availableFromLanguages = ["ko"];
    const availableTolanguages = ["en"];


    const callTranslate = (texts: string) => {
        (async () => {
            const data = await translate(texts, fromLanguage, toLanguage);
            console.log("data: ", data);
            setOutputTexts(data);
        })()
    }

    const switchLanguages = () => {
        if (availableFromLanguages.includes(toLanguage) && availableTolanguages.includes(fromLanguage)) {
            setFromLanguage(toLanguage);
            setToLanguage(fromLanguage);
        } else {
            toast.warning("Sorry, the pair of the selected languages are not available");
        }
    }

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <HStack spacing='10px' justifyContent="center">
                <VStack spacing={0}>
                    <LanguageSelector languages={availableFromLanguages} value={fromLanguage} handleUpdate={(la) => setFromLanguage(la)} />
                    <InputTextarea handleUpdate={(texts) => callTranslate(texts)} />
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