'use client'

import {
    Alert,
    Button,
    Card,
    CardBody,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {QueryClient, useQuery} from "react-query";
import axios from "axios";
import {createClient} from "@/utils/supabase/client";

export default function AutoUsers() {
    const queryClient = new QueryClient()
    const toast = useToast()


    const [usersCount, setUsersCount] = useState(1)

    const [users, setUsers] = useState([])
    const [fetchUsersError, setFetchUsersError] = useState('')
    const [isFetchUsersLoading, setIsFetchUsersLoading] = useState(false)


    const fetchUsersFromApi = async () => {
        setIsFetchUsersLoading(true)

        try {
            await axios.get(`https://randomuser.me/api/?results=${usersCount}&inc=dob,email,login,name,location&noinfo`)
                .then((data) => {
                    setFetchUsersError('')
                    setIsFetchUsersLoading(false)

                    setUsers(data.data.results)
                    console.log(`[DBG] Insert  in 'users' massive, count of users: ${data.data.results.length}`)

                    toast({
                        title: 'Успешно!',
                        description: "Пользователи подгружены. Нажмите зеленую кнопку, чтобы добавить их в БД",
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                    })


                })
        } catch (e: any) {
            setIsFetchUsersLoading(false)

            console.log(e)
            setFetchUsersError(e.message)
        }
    }

    const [insertUsersError, setInsertUsersError] = useState('')
    const [isInsertUsersLoading, setisInsertUsersLoading] = useState(false)
    const [currentInsertUsersState, setcurrentInsertUsersState] = useState(0)

    const insertUsers = async () => {
        setisInsertUsersLoading(true)

        const supabase = createClient()

        users.map( async (user, index) => {
            try {
                const {error} = await supabase.from('customers').insert({
                    // @ts-ignore
                    user_email: user.email,
                    // @ts-ignore
                    user_password: user.login.password,
                    // @ts-ignore
                    user_firstname: user.name.first,
                    // @ts-ignore
                    user_lastname: user.name.last,
                    // @ts-ignore
                    user_birthday: user.dob.date,
                    // @ts-ignore
                    user_city: user.location.city,
                    user_reg_ip: '0.0.0.0',
                    user_last_ip: '0.0.0.0',
                    user_is_confirmed: true,
                    registred_date: new Date().toLocaleDateString()
                })

                if(!error) {
                    console.log(`Current Index: `, index)
                    if(index >= users.length - 1) {
                        console.log('Finished')

                        toast({
                            title: 'Успешно!',
                            description: "Все пользователи добавлены в БД",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })

                        setUsers([])
                        setisInsertUsersLoading(false)
                    }
                } else {
                    setInsertUsersError(error.message)
                }
            } catch (e: any) {
                setInsertUsersError(e.message)

                console.log(e)
            }
        })
    }

    return (
        <>
            <Card mt={4}>
                <CardBody>
                    <Text mb={4} fontSize={`xl`}>Автоматическое добавление пользователей в БД</Text>
                    <Alert mb={4} rounded={`md`} colorScheme={`orange`}>
                        Используется только для наполнения БД и дебага. Обратите внимание, что все пользователи, добавленные в автоматическом режиме сразу подтверждены.
                    </Alert>
                    <Alert mb={4} rounded={`md`} colorScheme={`blue`}>
                        Сначала нажмите "Получить пользователей", затем после загрузки нажмите "Добавить пользователей в БД"
                    </Alert>
                    { fetchUsersError ?? <>
                        <Alert mb={4} rounded={`md`} colorScheme={`blue`}>
                            {fetchUsersError}
                        </Alert>
                    </> }
                    { insertUsersError ?? <>
                        <Alert mb={4} rounded={`md`} colorScheme={`blue`}>
                            {insertUsersError}
                        </Alert>
                    </> }
                    <FormControl>
                        <FormLabel>Кол-во новых аккаунтов</FormLabel>
                        {/*@ts-ignore*/}
                        <Input onChange={(e) => { setUsersCount(e.target.value) }} placeholder={`Например: 10`} type='number' />
                        <FormHelperText>Автоматическая регистрация пользователей.</FormHelperText>
                    </FormControl>
                    {users.length < 1 ? <Button onClick={fetchUsersFromApi} isLoading={isFetchUsersLoading} mt={4}>Получить пользователей</Button> : <Button colorScheme={`green`} onClick={insertUsers} isLoading={isInsertUsersLoading} mt={4}>Добавить пользователей в БД</Button>}
                </CardBody>
            </Card>
        </>
    )
}