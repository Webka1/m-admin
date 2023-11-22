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

    const fetchCustomers = async (type: string) => {
        if(type === 'banned') {
            const { data: customers } = await supabase.from('customers').select().match({
                // @ts-ignore
                user_is_banned: true,
                is_deleted: false
            }).order('id', { ascending: false })
            return customers
        } else if(type === 'deleted') {
            const { data: customers } = await supabase.from('customers').select().match({
                // @ts-ignore
                is_deleted: true
            }).order('id', { ascending: false })
            return customers
        } else if(type === 'confirmed') {
            const { data: customers } = await supabase.from('customers').select().match({
                // @ts-ignore
                user_is_confirmed: true,
                is_deleted: false
            }).order('id', { ascending: false })
            return customers
        } else if(type === 'unconfirmed') {
            const { data: customers } = await supabase.from('customers').select().match({
                // @ts-ignore
                user_is_confirmed: false,
                is_deleted: false
            }).order('id', { ascending: false })
            return customers
        } else {
            const { data: customers } = await supabase.from('customers').select()
            return customers
        }
    }

    switch (params.filter) {
        case 'banned':
            fetchCustomers('banned').then((res) => {
                // @ts-ignore
                setCustomers(res)
                setPageTitle('Забаненные')
            }).finally(() => {
                setIsLoading(false)
            })
            break;
        case 'deleted':
            fetchCustomers('deleted').then((res) => {
                // @ts-ignore
                setCustomers(res)
                setPageTitle('Удаленные')
            }).finally(() => {
                setIsLoading(false)
            })
            break;
        case 'confirmed':
            fetchCustomers('confirmed').then((res) => {
                // @ts-ignore
                setCustomers(res)
                setPageTitle('Подтвержденные')
            }).finally(() => {
                setIsLoading(false)
            })
            break;
        case 'unconfirmed':
            fetchCustomers('unconfirmed').then((res) => {
                // @ts-ignore
                setCustomers(res)
                setPageTitle('Неподтвержденные')
            }).finally(() => {
                setIsLoading(false)
            })
            break;
        default:

            break;
    }


    return (
        <>
            <Text fontSize={`2xl`}>{pageTitle} пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : <UsersTable setFromUserTable={setFromUserTable} customers={customers}/>}
        </>
    )
}