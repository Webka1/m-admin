'use client'

import {
    Alert,
    Button,
    Card,
    CardBody, Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    Input,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {useMask} from "@react-input/mask";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup'

export default function AddUser(this: any) {
    const toast = useToast()

    const [insertUsersError, setInsertUsersError] = useState('')

    const date = new Date();

    const supabase = createClient()

    const phoneRef = useMask({
        mask: '+7 (___) ___ __ __',
        replacement: { _: /\d/ }
    })

    const dateRef = useMask({
        mask: '____-__-__',
        replacement: { _: /\d/ }
    })

    const initialValues = {
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_phone: '',
        user_password: '',
        user_birthday: '',
        user_city: '',
        user_discount: 0,
    }

    const addUserSchema = Yup.object().shape({
        user_firstname: Yup.string()
            .min(2, 'Слишком короткое имя')
            .max(50, 'Слишком длинное имя')
            .required('Обязательно'),
        user_lastname: Yup.string()
            .min(2, 'Слишком короткая фамилия')
            .max(50, 'Слишком длинная фамилия')
            .required('Обязательно'),
        user_email: Yup.string().email('Неверный email').required('Обязательно'),
        user_password: Yup.string()
            .min(6, 'Для пароля должна быть больше 6 символов')
            .max(50, 'Для пароля должна не больше 50 символов')
            .required('Обязательно'),
        user_birthday: Yup.string().required('Обязательно'),
        user_city: Yup.string()
            .min(2, 'Слишком короткий город')
            .max(50, 'Слишком длинный город')
            .required('Обязательно'),
        user_discount: Yup.number().required('Обязательное поле').default(0)
    })

    // @ts-ignore
    return (
        <>
            <Card mt={4}>
                <CardBody>
                    <Text mb={4} fontSize={`xl`}>Ручное добавление пользователя</Text>
                    <Formik initialValues={initialValues}
                            validationSchema={addUserSchema}
                            onSubmit={async values => {
                                    try {
                                        const {error} = await supabase.from('customers').insert({
                                            user_email: values.user_email,
                                            user_password: values.user_password,
                                            user_firstname: values.user_firstname,
                                            user_lastname: values.user_lastname,
                                            user_birthday: new Date(values.user_birthday),
                                            user_city: values.user_city,
                                            user_is_banned: false,
                                            user_is_confirmed: false,
                                            user_reg_ip: '0.0.0.0',
                                            user_last_ip: '0.0.0.0',
                                            registred_date: `${date.toLocaleDateString('ru-RU', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}`,
                                            user_phone: `${values.user_phone}`
                                        })

                                        if(!error) {
                                            toast({
                                                title: 'Успешно!',
                                                description: "Пользователь добавлен в БД",
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                            })
                                            setInsertUsersError('')
                                        } else {
                                            setInsertUsersError(error.message)
                                        }
                                    } catch (e: any) {
                                        setInsertUsersError(e.message)
                                    }
                            }}
                    >
                        {(props) => (
                            <Form>
                                <Flex gap={2}>
                                    <Field name={`user_firstname`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_firstname && form.touched.user_lastname}>
                                                <FormLabel>Имя</FormLabel>
                                                <Input {...field} placeholder='Хаги' />
                                                <FormErrorMessage>{form.errors.user_firstname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name={`user_lastname`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_lastname && form.touched.user_lastname}>
                                                <FormLabel>Фамилия</FormLabel>
                                                <Input {...field} placeholder='Ваги' />
                                                <FormErrorMessage>{form.errors.user_lastname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex mt={2} gap={2}>
                                    <Field name={`user_email`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_email && form.touched.user_email}>
                                                <FormLabel>Почта</FormLabel>
                                                <Input {...field} placeholder='example@mail.ru' />
                                                <FormErrorMessage>{form.errors.user_email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name={`user_phone`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_phone && form.touched.user_phone}>
                                                <FormLabel>Телефон</FormLabel>
                                                <Input {...field} ref={phoneRef} placeholder={`Например: +7 (000) 000 00 00`} />
                                                <FormErrorMessage>{form.errors.user_phone}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex mt={2} gap={2}>
                                    <Field name={`user_birthday`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_birthday && form.touched.user_birthday}>
                                                <FormLabel>День рождения (YYYY-MM-DD)</FormLabel>
                                                <Input ref={dateRef} {...field} placeholder='Например: 2001-01-01' />
                                                <FormErrorMessage>{form.errors.user_birthday}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name={`user_discount`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_discount && form.touched.user_discount}>
                                                <FormLabel>Персональная скидка</FormLabel>
                                                <Input {...field} placeholder={`10=10% 23=23%`} />
                                                <FormErrorMessage>{form.errors.user_discount}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex mt={2} gap={2}>
                                    <Field name={`user_city`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_city && form.touched.user_city}>
                                                <FormLabel>Город</FormLabel>
                                                <Input {...field} placeholder='Москва' />
                                                <FormErrorMessage>{form.errors.user_city}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name={`user_password`}>
                                        {/*@ts-ignore*/}
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_password && form.touched.user_password}>
                                                <FormLabel>Пароль</FormLabel>
                                                <Input type={`password`} {...field} placeholder={`********`} />
                                                <FormErrorMessage>{form.errors.user_password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                                <Button isLoading={props.isSubmitting} colorScheme={`green`} type={"submit"} mt={4}>Добавить пользователя</Button>
                            </Form>
                        )}
                    </Formik>
                    {insertUsersError ? <Alert mt={4} rounded={`md`} colorScheme={`red`}>{insertUsersError}</Alert> : null}
                </CardBody>
            </Card>
        </>
    )
}