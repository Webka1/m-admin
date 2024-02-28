'use client'

import { createClient } from '@/utils/supabase/client'
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTable from '@/components/Dashboard/Table/DataTable'
import { RepeatIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Dashboard/Loader';
import TableEmpty from '@/components/Dashboard/Table/TableEmpty';
import { StorageActions } from '@/utils/TableActions';
import TableAddStorage from '@/components/Dashboard/Table/TableAddStorage';

export default function Storage() {

    const router = useRouter()

    const supabase = createClient()

    const [storages, setStorages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchStorages = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('storage').select('storage_name, storage_code').order('id', { ascending: true })

        // @ts-ignore
        setStorages(data)

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
            <Text fontSize={`2xl`}>Все склады {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchStorages}><RepeatIcon /></Button></>}</Text>
            <Box mt={1}>
                <TableAddStorage setFromStorageTable={setFromStorageTable} />
            </Box >
            {
                isLoading ?
                    <Loader />
                    : storages.length < 1 ?
                        <TableEmpty /> :
                        <DataTable data={storages} setFromTable={setFromStorageTable} data_columns={[
                            'Название склада',
                            'Код склада',
                            'Действия'
                        ]} data_actions={StorageActions} />
            }
        </>
    )
}