'use client'

import { createClient } from '@/utils/supabase/client'
import {Alert, Button, FormControl, FormHelperText, FormLabel, Input, Text} from "@chakra-ui/react";
import {cookies} from "next/headers";
import UsersTable from "@/components/Dashboard/UsersTable";
import {TSearchParams} from "@/utils/props";
import {useEffect, useState} from "react";

export default function Customers(props: TSearchParams) {
    const supabase = createClient()

    const [search, setSearch] = useState('')
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [customersIsNull, setCustomersIsNull] = useState(false)


    const searchCustomers = async () => {
        setIsLoading(true)

        if(typeof search == null || search == '' || search == undefined) {
            setIsLoading(false)
        } else {
            setIsLoading(true)

            const {data, error} = await supabase.rpc('search_customers', { keyword: `'${search}'` })
            if(data.length == 0) {
                setCustomers([])
                setCustomersIsNull(true)
            } else {
                setCustomers(data)
                setCustomersIsNull(false)
            }
            setIsLoading(false)
        }
    }

    return (
        <>
            <Text fontSize={`2xl`}>Поиск пользователя</Text>
            <FormControl mt={4} mb={4}>
                <FormLabel>Поисковый запрос</FormLabel>
                <Input onChange={(e) => setSearch(e.target.value)} placeholder={`Например: Тест`}/>
                <FormHelperText>Поиск осуществляется по имени / фамилии / почте и по номеру телефона</FormHelperText>
                <Button isDisabled={!search} isLoading={isLoading} onClick={searchCustomers} size={`lg`} mt={2}>Поиск</Button>
            </FormControl>
            {customersIsNull ? <Alert rounded={`md`} colorScheme={`blue`}>Пользователи не найдены.</Alert> : <UsersTable customers={customers}/>}
        </>
    )
}