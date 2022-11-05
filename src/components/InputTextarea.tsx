import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@chakra-ui/react'


interface IInputTextarea {
    texts: string;
    handleUpdate: (texts: string) => void;
}

let tid: NodeJS.Timeout | null = null;

function InputTextarea({ texts, handleUpdate }: IInputTextarea) {
    const latestTextsRef = useRef<string>(texts);
    const [inputValue, setInputValue] = useState<string>(texts);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setInputValue(value);

        if (value && value !== "") {
            if (tid !== null) clearTimeout(tid);

            tid = setTimeout(() => {
                if (value) {
                    console.log("@@@@ handle updated with", value);

                    latestTextsRef.current = value;
                    handleUpdate(value)
                    if (tid !== null) clearTimeout(tid);
                }
            }, 1000);
        }
    }

    useEffect(() => {
        if (latestTextsRef.current !== texts) {
            latestTextsRef.current = texts;

            setInputValue(texts);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [texts])

    return (
        <Textarea h="400px" placeholder='Enter texts to translate from' color="white" onChange={handleInputChange} value={inputValue}/>
    )
}

export default InputTextarea;