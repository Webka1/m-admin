'use client'

import { createClient } from '@/utils/supabase/client'
import {CircularProgress, Text} from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Customers() {

    const searchParams = useSearchParams()
    const search = searchParams.get('is_confirmed')

    // const cookieStore = cookies()
    const supabase = createClient()

    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromUserTable, setFromUserTable] = useState('')

    const fetchCustomers = async () => {
        setIsLoading(true)
        const { data: customers } = await supabase.from('customers').select().match({
            // @ts-ignore
            user_is_confirmed: search !== 'false' ? true : search === 'false' ? false : '',
            is_deleted: false
        })

        // @ts-ignore
        setCustomers(customers)
    }

    useEffect(() => {
        fetchCustomers().finally(() => {
            setIsLoading(false)
            setFromUserTable('')
        })
    }, [search, fromUserTable])

    return (
        <>
            {/*// @ts-ignore*/}
            <Text fontSize={`2xl`}>{searchParams !== 'false' ? 'Подтвержденные' : 'Неподтвержденные'} пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : <UsersTable setFromUserTable={setFromUserTable} customers={customers}/>}
        </>
    )
}