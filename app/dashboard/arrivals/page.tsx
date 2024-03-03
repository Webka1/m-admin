'use client'

import { createClient } from '@/utils/supabase/client'
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from '@/components/Dashboard/Table/DataTable'
import { RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Dashboard/Loader';
import TableEmpty from '@/components/Dashboard/Table/TableEmpty';
import TableAddStorage from '@/components/Dashboard/Table/TableAddStorage';
import { ArrivalsActions } from '@/utils/TableActions';

export default function Items() {

    const router = useRouter()

    const supabase = createClient()

    const [arrivals, setArrivals] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchArrivals = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('arrivals').select('id, arrival_code, created_at, confirmed_at').order('id', { ascending: true })

        // @ts-ignore
        // console.log(data?.map((item) => {
        //     return {
        //         id: item.id,
        //         created_at: item.created_at,
        //         confirmed_at: item.confirmed_at,
        //         items: item.items.map((i: any) => {
        //             return {
        //                 item_sku: i.item_sku,
        //                 quanity: i.quantity
        //             }
        //         })
        //     }
        // }))

        setArrivals(data?.map((item) => {
            return {
                id: item.id,
                arrival_code: item.arrival_code,
                created_at: new Date(item.created_at).toLocaleString(),
                confirmed_at: item.confirmed_at ? item.confirmed_at : 'Не принята',
            }
        }))

        setIsLoading(false)
    }

    useEffect(() => {
        // fetchArrivals()


        if (typeof fromStorageTable === 'string') {
            fetchArrivals().finally(() => {
                setIsLoading(false)

                setFromStorageTable('')
            })
        } else {
            // @ts-ignore
            if (fromStorageTable.action === 'view') {

                console.log(fromStorageTable)

                // @ts-ignore
                router.push(`/dashboard/arrivals/${fromStorageTable.id}`)
                // @ts-ignore
            } else {
                console.log(fromStorageTable)
            }

            console.log(fromStorageTable)
        }

    }, [fromStorageTable])

    return (
        <>
            <Text fontSize={`2xl`}>Все поставки {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchArrivals}><RepeatIcon /></Button></>}</Text>
            {
                isLoading ?
                    <Loader />
                    : arrivals?.length < 1 ?
                        <TableEmpty /> :
                        <DataTable data={arrivals} setFromTable={setFromStorageTable} data_columns={[
                            'ID',
                            'Номер поставки',
                            'Создана',
                            'Принята',
                            'Действия'
                        ]} data_actions={ArrivalsActions} />
            }
        </>
    )
}