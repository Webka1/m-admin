'use client'

import {
    Alert,
    Button,
    Card,
    CardBody, Checkbox, Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input, Select, Stack,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {createClient} from "@/utils/supabase/client";
import {useMask} from "@react-input/mask";

export default function AddUser() {
    const toast = useToast()


    const [usersCount, setUsersCount] = useState(1)

    const [isConfirmed, setIsConfirmed] = useState(true)
    const [isBanned, setIsBanned] = useState(false)

    const [insertUsersError, setInsertUsersError] = useState('')
    const [isInsertUsersLoading, setisInsertUsersLoading] = useState(false)

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedDate = formatter.format(date); // MM-DD-YYYY

    const supabase = createClient()

    const phoneRef = useMask({
        mask: '+7 (___) ___ __ __',
        replacement: { _: /\d/ }
    })

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const [newUser, setNewUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        bday: '',
        city: '',
        discount: '',
        is_confirmed: isConfirmed,
        is_banned: isBanned,
        password: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function insertUser() {
        console.log('User', newUser)
    }

    return (
        <>
            <Card mt={4}>
                <CardBody>
                    <Text mb={4} fontSize={`xl`}>Ручное добавление пользователя</Text>
                    { insertUsersError ?? <>
                        <Alert mb={4} rounded={`md`} colorScheme={`blue`}>
                            {insertUsersError}
                        </Alert>
                    </> }
                    <FormControl>
                        <Stack>
                            <Flex gap={2}>
                                <FormControl>
                                    <FormLabel>Имя</FormLabel>
                                    <Input onChange={handleChange} name={`firstname`} placeholder={`Хаги`}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Фамилия</FormLabel>
                                    <Input onChange={handleChange} name={`lastname`} placeholder={`Ваги`}/>
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel>Почта</FormLabel>
                                <Input onChange={handleChange} name={`email`} placeholder={`example@example.ru`}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Телефон</FormLabel>
                                <Input onChange={handleChange} name={`phone`} ref={phoneRef} placeholder={`Например: +7 (000) 000 00 00`}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>День рождения (YYYY-MM-DD)</FormLabel>
                                <Input onChange={handleChange} name={`bday`} placeholder={`Например: 1900-01-01`}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Город</FormLabel>
                                <Input onChange={handleChange} name={`ciy`} placeholder={`Например: Москва`}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Скидка пользователя (%) | 10=10%</FormLabel>
                                <Input onChange={handleChange} name={`discount`} placeholder={`20=20%, 31=31%`}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Input onChange={handleChange} name={`password`} placeholder={`************`}/>
                            </FormControl>
                        </Stack>
                        <Stack mt={4} spacing={[1, 5]} direction={['column', 'row']}>
                            <Checkbox defaultChecked={isConfirmed} onChange={() => { setIsConfirmed(!isConfirmed) }} size='md' colorScheme='green'>
                                Подтвержденный аккаунт
                            </Checkbox>
                            <Checkbox defaultChecked={isBanned} onChange={() => { setIsBanned(!isBanned) }} size='md' colorScheme='red'>
                                Забаненный аккаунт
                            </Checkbox>
                        </Stack>
                    </FormControl>
                    <Button onClick={insertUser} colorScheme={`green`} mt={4}>Добавить пользователя</Button>
                </CardBody>
            </Card>
        </>
    )
}