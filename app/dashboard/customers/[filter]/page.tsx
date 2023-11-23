'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {CircularProgress, Text} from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";

export default function FilterCustomers({ params }: { params: { filter: string } }) {

    const supabase = createClient()
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [fromUserTable, setFromUserTable] = useState('')
    const [pageTitle, setPageTitle] = useState('...')

    async function fetchUsers() {
        setIsLoading(true)
        try {
            if(params.filter == 'banned') {
                setPageTitle('Забаненные')
                // @ts-ignore
                const { data: customers } = await supabase.from('customers').select().match({
                    // @ts-ignore
                    user_is_banned: true,
                    is_deleted: false
                }).order('id', { ascending: true })

                // @ts-ignore
                setCustomers(customers)
            } else if(params.filter == 'deleted') {
                setPageTitle('Удаленные')
                // @ts-ignore
                const { data: customers } = await supabase.from('customers').select().match({
                    // @ts-ignore
                    is_deleted: true
                }).order('id', { ascending: true })

                // @ts-ignore
                setCustomers(customers)
            } else if(params.filter == 'confirmed') {
                setPageTitle('Подтвержденные')
                // @ts-ignore
                const { data: customers } = await supabase.from('customers').select().match({
                    // @ts-ignore
                    user_is_confirmed: true,
                    is_deleted: false
                }).order('id', { ascending: true })

                // @ts-ignore
                setCustomers(customers)
            } else if(params.filter == 'unconfirmed') {
                setPageTitle('Неподтвержденные')
                // @ts-ignore
                const { data: customers } = await supabase.from('customers').select().match({
                    // @ts-ignore
                    user_is_confirmed: false,
                    is_deleted: false
                }).order('id', { ascending: true })

                // @ts-ignore
                setCustomers(customers)
            } else {
                setPageTitle('Все')
                // @ts-ignore
                const { data: customers } = await supabase.from('customers').select().order('id', { ascending: true })

                // @ts-ignore
                setCustomers(customers)
            }
        } catch (e) {
            console.log(e)
        }

        setIsLoading(false)
    }


    useEffect(() => {
        fetchUsers()
    }, [fromUserTable]);


    return (
        <>
            <Text fontSize={`2xl`}>{pageTitle} пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : customers ? <UsersTable setFromUserTable={setFromUserTable} customers={customers}/> : ''}
        </>
    )
}