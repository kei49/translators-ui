import React, { useEffect, useState } from 'react';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Box, HStack, VStack } from '@chakra-ui/react'

import LanguageSelector from '../components/LanguageSelector';
import InputTextarea from '../components/InputTextarea';

function Main() {
    const [fromLanguage, setFromLanguage] = useState<string>("ko");
    const [toLanguage, setToLanguage] = useState<string>("en");
    const [outputTexts, setOutputTexts] = useState<string>("");

    const availableFromLanguages = ["ko"];
    const availableTolanguages = ["en"];

    const url = "http://localhost:8081/translate"

    const getOptions = (body: Record<string, string>) => ({
        headers: {
        "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body)
    });

    useEffect(() => {
        console.log("@@@ fromLanguage", fromLanguage);
    }, [fromLanguage])

    useEffect(() => {
        console.log("@@@ toLanguage", toLanguage);
    }, [toLanguage])

    const translateKoToEn = (texts: string) => {
        (async () => {
            const res = await fetch(url, getOptions({
                "texts": texts,
                "from_la": "ko",
                "to_la": "en"
            }))

            const data = await res.json();

            console.log("data: ", data);
            setOutputTexts(data);
        })()
    }

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <HStack spacing='10px' justifyContent="center">
                <VStack spacing={0}>
                    <LanguageSelector languages={availableFromLanguages} value={fromLanguage} handleUpdate={(la) => setFromLanguage(la)} />
                    <InputTextarea handleUpdate={(texts) => translateKoToEn(texts)} />
                </VStack>
                <VStack spacing={0}>
                    <LanguageSelector languages={availableTolanguages} value={toLanguage} handleUpdate={(la) => setToLanguage(la)} />
                    <Textarea defaultValue="" value={outputTexts} h="200px" placeholder='Translated texts will be displayed here' color="white" />
                </VStack>
            </HStack>
        </Box>
    )
}

export default Main;