'use client'

import { createClient } from '@/utils/supabase/client'
import {CircularProgress, Text} from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import {useEffect, useState} from "react";

export default function Customers() {
    const supabase = createClient()
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromUserTable, setFromUserTable] = useState('')

    const fetchCustomers = async () => {
        setIsLoading(true)
        const { data: customers } = await supabase.from('customers').select().match({
            // @ts-ignore
            is_deleted: true
        })

        // @ts-ignore
        setCustomers(customers)
    }

    useEffect(() => {
        fetchCustomers().finally(() => {
            setIsLoading(false)
        })

        console.log(`Got messages from UserTable: `, fromUserTable)
        setFromUserTable('')
    }, [fromUserTable])

    return (
        <>
            {/*// @ts-ignore*/}
            <Text fontSize={`2xl`}>Удаленные пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : <UsersTable setFromUserTable={setFromUserTable} customers={customers}/>}
        </>
    )
}