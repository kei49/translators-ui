import React from 'react';
import { Switch, Box, FormControl, FormLabel } from '@chakra-ui/react'


interface ISwitchTranslateType {
    handleUpdate: (checked: boolean) => void;
}


function SwitchTranslateType({ handleUpdate }: ISwitchTranslateType) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        handleUpdate(checked)
    }

    return (
        <Box mt={2}>
            <FormControl display='flex' alignItems='center'>
                <FormLabel color="white" mb='0'>
                    Translate by all available models
                </FormLabel>
            <Switch id='email-alerts' onChange={(e) => handleInputChange(e)} />
            </FormControl>
        </Box>
            
    )
}

export default SwitchTranslateType;