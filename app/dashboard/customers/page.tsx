'use client'

import { createClient } from '@/utils/supabase/client'
import {CircularProgress, Text} from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import {useEffect, useState} from "react";

export default function Customers() {
    const supabase = createClient()
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchCustomers = async () => {
        setIsLoading(true)
        const { data: customers } = await supabase.from('customers').select().order('id', { ascending: true })

        // @ts-ignore
        setCustomers(customers)
    }

    useEffect(() => {
        fetchCustomers().finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {/*// @ts-ignore*/}
            <Text fontSize={`2xl`}>Все пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : <UsersTable customers={customers}/>}
        </>
    )
}