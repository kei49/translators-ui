import React from 'react';
// import { useFormik } from 'formik';
import { Field, Form, Formik, FormikProps, useFormikContext, FormikContextType } from 'formik';
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
    const AutoSubmit = () => {
        const { values, submitForm }: FormikContextType<FormikInput> = useFormikContext();
        React.useEffect(() => {
            if (values.language !== value) {
                submitForm();
            }
        }, [values, submitForm]);
        return <></>;
    }

    return (
        <Box width='xl'>
            <Formik
                initialValues={{ language: value }}
                onSubmit={(values, actions) => {
                    handleUpdate(values.language);
                }}
                >
                {(props: FormikProps<any>) => (
                    <Form>
                        <Field as={Select} placeholder='Select language' name="language" color="white">
                            {languages.map(la => (
                                <option key={la} value={la} color="white">{la}</option>
                            ))}
                        </Field>
                        <AutoSubmit />
                    </Form>
                )}
            </Formik>
        </Box>
            
    )
}

export default LanguageSelector;