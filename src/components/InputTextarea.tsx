import React from 'react';
// import { useFormik } from 'formik';
import { Field, Form, Formik, FormikProps, useFormikContext, FormikContextType } from 'formik';
import { Box, Textarea } from '@chakra-ui/react'


interface IInputTextarea {
    handleUpdate: (texts: string) => void;
}

interface FormikInput {
    texts: string;
}

let tid: NodeJS.Timeout | null = null;

function InputTextarea({ handleUpdate }: IInputTextarea) {
    const AutoSubmit = () => {
        const { values, submitForm }: FormikContextType<FormikInput> = useFormikContext();
        React.useEffect(() => {
            if (values.texts) {
                if (tid !== null) clearTimeout(tid);

                tid = setTimeout(() => {
                    submitForm();
                }, 1000);
            }
        }, [values, submitForm]);
        return <></>;
    }

    return (
        <Box width='xl'>
            <Formik
                initialValues={{ texts: "" }}
                onSubmit={(values, actions) => {
                    handleUpdate(values.texts);
                }}
                >
                {(props: FormikProps<any>) => (
                    <Form>
                        <Field h="200px" as={Textarea} placeholder='Enter texts to translate from' name="texts" color="white" />
                        <AutoSubmit />
                    </Form>
                )}
            </Formik>
        </Box>
            
    )
}

export default InputTextarea;