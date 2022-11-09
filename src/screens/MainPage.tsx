import React, { useState } from 'react';
import { Textarea, Icon, Box, VStack } from '@chakra-ui/react'

import { TbSwitchHorizontal } from "react-icons/tb";
// import { toast } from 'react-toastify';

import LanguageSelector from '../components/LanguageSelector';
import InputTextarea from '../components/InputTextarea';
import { useTranslate } from '../hooks/useTranslate';
import SwitchTranslateType from '../components/SwitchTranslateType';

function MainPage() {
    const [fromLanguage, setFromLanguage] = useState<string>("en");
    const [toLanguage, setToLanguage] = useState<string>("ko");
    const [inputTexts, setInputTexts] = useState<string>("");
    const [outputTexts, setOutputTexts] = useState<string>("");
    const [doTranslateAll, setDoTranslateAll] = useState<boolean>(false);

    useTranslate({
        params: {
            texts: inputTexts,
            fromLanguage,
            toLanguage
        },
        returnResults: (texts: string) => setOutputTexts(texts),
        doTranslateAll
    });

    const switchLanguages = () => {
        setFromLanguage(toLanguage);
        setToLanguage(fromLanguage);

        setInputTexts(outputTexts);
        setOutputTexts('');
    }

    const handleOneLanugageUpdate = (la: string, isFrom: boolean) => {
        if ((isFrom && la === toLanguage) || (!isFrom && la === fromLanguage)) {
            switchLanguages();
        } else{
            if (isFrom) {
                la && setFromLanguage(la);
                setInputTexts("");
            } else {
                la && setToLanguage(la);
            }
            
            setOutputTexts("");
        }
    }

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <Box display="flex">
                <VStack w="100%" ml="50px">
                    <LanguageSelector value={fromLanguage} handleUpdate={(la) => handleOneLanugageUpdate(la, true)} />
                    <InputTextarea texts={inputTexts} handleUpdate={(texts) => setInputTexts(texts)} />
                </VStack>
                <Icon as={TbSwitchHorizontal} pt="8px" w={{ base: "10%", md: "5%",xl: "5%" }} h={8} color="white" onClick={() => switchLanguages()} _hover={{ cursor: "pointer" }} />
                <VStack w="100%" mr="50px">
                    <LanguageSelector value={toLanguage} handleUpdate={(la) => handleOneLanugageUpdate(la, false)} />
                    <Textarea value={outputTexts} readOnly h="400px" placeholder='Translated texts will be displayed here' color="white" />
                </VStack>
            </Box>
            <SwitchTranslateType handleUpdate={setDoTranslateAll} />
        </Box>
    )
}

export default MainPage;