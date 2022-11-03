import React, { useEffect } from 'react';
import { Field, useFormikContext, FormikContextType, useFormik, FormikProvider } from 'formik';
// import { Field, useFormik, FormikProvider } from 'formik';
import { Box, Textarea } from '@chakra-ui/react'


interface IInputTextarea {
    texts: string;
    handleUpdate: (texts: string) => void;
}

interface FormikInput {
    texts: string;
}

let tid: NodeJS.Timeout | null = null;

function InputTextarea({ texts, handleUpdate }: IInputTextarea) {
    const formik = useFormik({
        initialValues: { texts },
        onSubmit: (values) => {
            handleUpdate(values.texts);
        }
    })
 
    const AutoSubmit = () => {
        const { values }: FormikContextType<FormikInput> = useFormikContext();
        
        useEffect(() => {
            if (values && values.texts !== "" && values.texts !== texts) {
                if (tid !== null) clearTimeout(tid);

                tid = setTimeout(() => {
                    if (values) {
                        formik.submitForm()
                        if (tid !== null) clearTimeout(tid);
                    }
                }, 300);
            }
        }, [values]);
        return <></>;
    }

    useEffect(() => {
        formik.setFieldValue('texts', texts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [texts])

    return (
        <Box w="100%">
            <form onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                    <Field h="200px" as={Textarea} placeholder='Enter texts to translate from' name="texts" color="white" />
                    <AutoSubmit />
                </FormikProvider>
            </form>
        </Box>
            
    )
}

export default InputTextarea;