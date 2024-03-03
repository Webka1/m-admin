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

export default function ItemsInStorage() {

    const router = useRouter()

    const supabase = createClient()

    const [itemsInStorage, setItemsInStorage] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchStorages = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('items_in_storage').select('item_sku(*), storage_code, quantity, price').order('id', { ascending: true })

        // @ts-ignore
        setItemsInStorage(data.map((item: any) => {
            return {
                name: item.item_sku.item_title,
                sku: item.item_sku.item_sku,
                brand: item.item_sku.item_brand,
                category: item.item_sku.item_category,
                quantity: item.quantity,
                sell_price: item.price,
                storage: item.storage_code
            }
        }))

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
            <Text fontSize={`2xl`}>Товары на складах {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchStorages}><RepeatIcon /></Button></>}</Text>
            {
                isLoading ?
                    <Loader />
                    : itemsInStorage.length < 1 ?
                        <TableEmpty /> :
                        <DataTable data={itemsInStorage} setFromTable={setFromStorageTable} data_columns={[
                            'Название',
                            'Артикул',
                            'Бренд',
                            'Категория',
                            'Наличие (шт)',
                            'Цена (руб)',
                            'Склад'
                        ]} data_actions={[]} />
            }
        </>
    )
}