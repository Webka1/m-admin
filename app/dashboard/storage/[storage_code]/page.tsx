'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, CircularProgress, Text } from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import Loader from "@/components/Dashboard/Loader";
import DataTable from "@/components/Dashboard/Table/DataTable";
import TableEmpty from "@/components/Dashboard/Table/TableEmpty";
import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import Link from "next/link";
import TableAddItem from "@/components/Dashboard/Table/TableAddItem";

export default function viewStorage({ params }: { params: { storage_code: string } }) {

    const supabase = createClient()

    const [storage, setStorage] = useState('...')
    const [itemsInStorage, setItemsInStorage] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isErorr, setIsError] = useState(false)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchStorage = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('storage').select('storage_name').eq('storage_code', `${params.storage_code}`)
        // @ts-ignore

        if (data.length > 0) {
            // @ts-ignore
            setStorage(data[0].storage_name)
        } else {
            setStorage('Склад не найден')
            setIsError(true)
        }
    }

    const fetchStorageItems = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('items_in_storage').select('item_sku(*), quantity, price').eq('storage_code', params.storage_code)
        // @ts-ignore
        // setItemsInStorage(data)

        setItemsInStorage(data.map((item: any) => {
            return {
                name: item.item_sku.item_title,
                sku: item.item_sku.item_sku,
                brand: item.item_sku.item_brand,
                category: item.item_sku.item_category,
                quantity: item.quantity,
                purchase_price: item.item_sku.item_price,
                sell_price: item.price
            }
        }))
    }


    const fetchAll = async () => {
        await fetchStorage()
        await fetchStorageItems()
        setIsLoading(false)
    }


    useEffect(() => {
        fetchAll()
    }, [fromStorageTable])

    return (
        <>
            <Box mb={3}>
                <ButtonGroup>
                    <Link href={'/dashboard/storage/all'}>
                        <Button size={`sm`}><ArrowBackIcon /> Назад</Button>
                    </Link>
                    <TableAddItem setFromStorageTable={setFromStorageTable} current_storage={params.storage_code} />
                </ButtonGroup>
            </Box>
            <Text fontSize={`2xl`}>Обзор склада: {storage} {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchAll}><RepeatIcon /></Button></>}</Text>
            {isLoading ?
                <Loader />
                : itemsInStorage.length < 1 ?
                    <TableEmpty /> :
                    <DataTable data={itemsInStorage} setFromTable={setFromStorageTable} data_columns={[
                        'Наименование',
                        'Артикул',
                        'Бренд',
                        'Категория',
                        'Наличие (шт)',
                        'Цена закупа (руб)',
                        'Цена продажи (руб)'
                    ]} data_actions={[

                    ]} />
            }
        </>
    )
}