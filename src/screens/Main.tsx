import React, { useEffect, useState } from 'react';
// import { Grid, GridItem } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Box, HStack, VStack } from '@chakra-ui/react'

import LanguageSelector from '../components/LanguageSelector';

function Main() {
    const [fromLanguage, setFromLanguage] = useState<string>("en");
    const [toLanguage, setToLanguage] = useState<string>("ja");

    const languagesList = ["ko", "ja", "en"];

    useEffect(() => {
        console.log("@@@ fromLanguage", fromLanguage);
    }, [fromLanguage])

    return (
        <Box pt="20px" margin="auto" minHeight="1000px" bgColor="#282c34">
            <HStack spacing='10px' justifyContent="center">
                <VStack spacing={0}>
                    <LanguageSelector languages={languagesList} value={fromLanguage} handleUpdate={(la) => setFromLanguage(la)} />
                    <Textarea h="200px" placeholder='Enter texts to translate from' color="white" />
                </VStack>
                <VStack spacing={0}>
                    <LanguageSelector languages={languagesList} value={toLanguage} handleUpdate={(la) => setToLanguage(la)} />
                    <Textarea h="200px" placeholder='Translated texts will be displayed here' color="white" />
                </VStack>
            </HStack>
        </Box>
    )
}

export default Main;