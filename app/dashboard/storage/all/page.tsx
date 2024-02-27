'use client'

import { createClient } from '@/utils/supabase/client'
import { Button, Progress, Text } from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import { useEffect, useState } from "react";
import DataTable from '@/components/Dashboard/Table/DataTable'
import { DeleteIcon, EditIcon, RepeatIcon, SpinnerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

export default function Storage() {

    const router = useRouter()

    const supabase = createClient()

    const [storages, setStorages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchStorages = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('storage').select('id, storage_name, storage_code').order('id', { ascending: true })

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
                // @ts-ignore
                router.push(`/dashboard/storage/${fromStorageTable.id}`)
            } else {
                console.log(fromStorageTable)
            }
        }

    }, [fromStorageTable])

    return (
        <>
            {/*// @ts-ignore*/}
            <Text fontSize={`2xl`}>Все склады {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`} onClick={fetchStorages}><RepeatIcon /></Button></>}</Text>
            {isLoading ? <Progress mt={2} size={`sm`} colorScheme='gray' isIndeterminate /> : storages.length < 1 ?
                <>
                    <Text>Склады не найдены</Text>
                </> :
                <>
                    <DataTable data={storages} setFromTable={setFromStorageTable} data_columns={[
                        'ID',
                        'Название склада',
                        'Код склада',
                        'Действия'
                    ]} data_actions={[
                        {
                            name: 'Просмотреть товары на складе',
                            action: 'view',
                            color: 'blue'
                        },
                    ]} />
                </>
            }
        </>
    )
}