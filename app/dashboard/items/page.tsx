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

export default function Items() {

    const router = useRouter()

    const supabase = createClient()

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchStorages = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('items').select('item_title, item_description, item_details, item_category, item_brand, item_sku').order('id', { ascending: true })

        // @ts-ignore
        setItems(data)

        setIsLoading(false)
    }

    useEffect(() => {
        if (typeof fromStorageTable === 'string') {
            fetchStorages().finally(() => {
                setIsLoading(false)

                setFromStorageTable('')
            })
        } else {
            // @ts-ignore
            if (fromStorageTable.action === 'view') {

                console.log(fromStorageTable)

                // @ts-ignore
                router.push(`/dashboard/storage/${fromStorageTable.id}`)
            } else {
                console.log(fromStorageTable)
            }
        }

    }, [fromStorageTable])

    return (
        <>
            <Text fontSize={`2xl`}>Все товары {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchStorages}><RepeatIcon /></Button></>}</Text>
            {
                isLoading ?
                    <Loader />
                    : items.length < 1 ?
                        <TableEmpty /> :
                        <DataTable data={items} setFromTable={setFromStorageTable} data_columns={[
                            'Название',
                            'Описание',
                            'Детали',
                            'Категория',
                            'Бренд',
                            'Артикул'
                        ]} data_actions={[]} />
            }
        </>
    )
}