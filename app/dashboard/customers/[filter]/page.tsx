'use client'
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {CircularProgress, Text} from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import {ICustomer} from "@/utils/interface";

export default function FilterCustomers({ params }: { params: { filter: string } }) {

    const supabase = createClient()
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [fromUserTable, setFromUserTable] = useState('')
    const [pageTitle, setPageTitle] = useState('...')
    const [completed, setIsCompleted] = useState(false)


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
            }
        } catch (e) {
            console.log(e)
        }

        setIsLoading(false)
    }


    useEffect(() => {
        fetchUsers()
    }, [fromUserTable]);

    //
    // switch (params.filter) {
    //     case 'banned':
    //         try {
    //             // @ts-ignore
    //             const { data: customers } = supabase.from('customers').select().match({
    //                             // @ts-ignore
    //                 user_is_banned: true,
    //                 is_deleted: false
    //             }).order('id', { ascending: false })
    //
    //             setCustomers(customers)
    //         } catch (e) {
    //             console.log(e)
    //         }
    // }

    // const fetchCustomers = async () => {
    //     if(params.filter === 'banned') {
    //         const { data: customers } = await supabase.from('customers').select().match({
    //             // @ts-ignore
    //             user_is_banned: true,
    //             is_deleted: false
    //         }).order('id', { ascending: false })
    //         return customers
    //     } else if(params.filter === 'deleted') {
    //         const { data: customers } = await supabase.from('customers').select().match({
    //             // @ts-ignore
    //             is_deleted: true
    //         }).order('id', { ascending: false })
    //         return customers
    //     } else if(params.filter === 'confirmed') {
    //         const { data: customers } = await supabase.from('customers').select().match({
    //             // @ts-ignore
    //             user_is_confirmed: true,
    //             is_deleted: false
    //         }).order('id', { ascending: false })
    //
    //         setPageTitle('Подтвержденные')
    //         setCustomers(customers)
    //         setIsLoading(false)
    //     } else if(params.filter === 'unconfirmed') {
    //         const { data: customers } = await supabase.from('customers').select().match({
    //             // @ts-ignore
    //             user_is_confirmed: false,
    //             is_deleted: false
    //         }).order('id', { ascending: false })
    //         return customers
    //     } else {
    //         const { data: customers } = await supabase.from('customers').select()
    //         return customers
    //     }
    // }

    // if(!completed) {
    //     switch (params.filter) {
    //         case 'banned':
    //             fetchCustomers('banned').then((res) => {
    //                 // @ts-ignore
    //                 setCustomers(res)
    //                 setPageTitle('Забаненные')
    //                 setIsCompleted(true)
    //             }).finally(() => {
    //                 setIsLoading(false)
    //             })
    //             break;
    //         case 'deleted':
    //             fetchCustomers('deleted').then((res) => {
    //                 // @ts-ignore
    //                 setCustomers(res)
    //                 setIsCompleted(true)
    //                 setPageTitle('Удаленные')
    //             }).finally(() => {
    //                 setIsLoading(false)
    //             })
    //             break;
    //         case 'confirmed':
    //             fetchCustomers('confirmed').then((res) => {
    //                 // @ts-ignore
    //                 setCustomers(res)
    //                 setIsCompleted(true)
    //                 setPageTitle('Подтвержденные')
    //             }).finally(() => {
    //                 setIsLoading(false)
    //             })
    //             break;
    //         case 'unconfirmed':
    //             fetchCustomers('unconfirmed').then((res) => {
    //                 // @ts-ignore
    //                 setCustomers(res)
    //                 setIsCompleted(true)
    //                 setPageTitle('Неподтвержденные')
    //             }).finally(() => {
    //                 setIsLoading(false)
    //             })
    //             break;
    //         default:
    //             fetchCustomers('').then((res) => {
    //                 // @ts-ignore
    //                 setCustomers(res)
    //                 setIsCompleted(true)
    //                 setPageTitle('Все')
    //             }).finally(() => {
    //                 setIsLoading(false)
    //             })
    //             setIsCompleted(true)
    //             break;
    //     }
    // }

    // useEffect(() => {
    //     // if(fromUserTable == '') {
    //     //     console.log('empty')
    //     // } else {
    //     //     console.log('updated table', fromUserTable)
    //     //     fetchCustomers().then((res) => {
    //     //         setCustomers(res)
    //     //     })
    //     //     setIsCompleted(false)
    //     // }
    //     fetchCustomers()
    //     setIsCompleted(false)
    // }, [fromUserTable])


    return (
        <>
            <Text fontSize={`2xl`}>{pageTitle} пользователи</Text>
            {isLoading ? <CircularProgress isIndeterminate /> : customers ? <UsersTable setFromUserTable={setFromUserTable} customers={customers}/> : ''}
        </>
    )
}