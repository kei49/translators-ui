import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Box } from '@chakra-ui/react'

import { availableLanguageOptions, getOptionByCode } from '../common/constants';


interface ILanguageSelector {
    value: string;
    handleUpdate: (code: string) => void;
}


function LanguageSelector({ value, handleUpdate }: ILanguageSelector) {
    const { handleSubmit, control, watch, setValue } = useForm();
    const watchLanguage = watch("language");
    const options = availableLanguageOptions;

    useEffect(() => {
        setValue("language", getOptionByCode(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (watchLanguage && watchLanguage.value && watchLanguage.value !== value) {
            handleUpdate(watchLanguage.value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchLanguage])

    return (
        <Box w="100%">
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <Controller
                    control={control}
                    name="language"
                    render={({ field: { onChange, ref}}) => (
                        <Select
                            ref={ref}
                            // defaultValue={}
                            value={getOptionByCode(value)}
                            onChange={onChange}
                            options={options}
                        />
                    )}
                />
            </form>
        </Box>
            
    )
}

export default LanguageSelector;