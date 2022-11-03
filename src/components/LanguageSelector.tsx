import React, { useEffect } from 'react';
// import { useFormik } from 'formik';
import { Field, FormikProvider, useFormikContext, FormikContextType, useFormik } from 'formik';
import { Box, Select } from '@chakra-ui/react'


interface ILanguageSelector {
    languages: string[];
    value: string;
    handleUpdate: (language: string) => void;
}

interface FormikInput {
    language: string;
}

function LanguageSelector({ languages, value, handleUpdate }: ILanguageSelector) {
    const formik = useFormik({
        initialValues: { language: value },
        onSubmit: (values) => {
            handleUpdate(values.language);
        },
        enableReinitialize: true
    })

    const AutoSubmit = () => {
        const { values, submitForm }: FormikContextType<FormikInput> = useFormikContext();
        React.useEffect(() => {
            if (values.language !== value) {
                submitForm();
            }
        }, [values, submitForm]);
        return <></>;
    }

    useEffect(() => {
        console.log("@@@@ updating", value);
        formik.setValues({ language: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <Box w="100%">
            
                <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Field as={Select} value={value} placeholder='Select language' name="language" color="white">
                        {languages.map(la => (
                            <option key={la} value={la} color="white">{la}</option>
                        ))}
                    </Field>
                    <AutoSubmit />
            </form>
                </FormikProvider>
        </Box>
            
    )
}

export default LanguageSelector;