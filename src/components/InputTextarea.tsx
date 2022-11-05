import React, { useEffect } from 'react';
import { Box, Textarea } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form';


interface IInputTextarea {
    texts: string;
    handleUpdate: (texts: string) => void;
}

let tid: NodeJS.Timeout | null = null;

function InputTextarea({ texts, handleUpdate }: IInputTextarea) {
    const { watch, control } = useForm();
    const watchTexts = watch("texts");

    useEffect(() => {
        if (watchTexts && watchTexts !== "") {
            if (tid !== null) clearTimeout(tid);

            tid = setTimeout(() => {
                if (watchTexts) {
                    console.log("@@@@ handle updated with", watchTexts);
                    handleUpdate(watchTexts)
                    if (tid !== null) clearTimeout(tid);
                }
            }, 300);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchTexts])

    return (
        <Box w="100%">
            <form>
                <Controller
                    control={control}
                    name="texts"
                    render={({ field: { onChange }}) => (
                        <Textarea h="400px" placeholder='Enter texts to translate from' color="white" onChange={onChange} value={texts}/>
                    )}
                />
            </form>
        </Box>
            
    )
}

export default InputTextarea;