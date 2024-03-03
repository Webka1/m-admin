'use client'
import { createClient } from "@/utils/supabase/client";
import { use, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, CircularProgress, Text } from "@chakra-ui/react";
import UsersTable from "@/components/Dashboard/Customers/UsersTable";
import Loader from "@/components/Dashboard/Loader";
import DataTable from "@/components/Dashboard/Table/DataTable";
import TableEmpty from "@/components/Dashboard/Table/TableEmpty";
import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import Link from "next/link";
import TableAddItem from "@/components/Dashboard/Table/TableAddItem";

export default function viewStorage({ params }: { params: { arrival_id: string } }) {

    const supabase = createClient()

    const [arrivalItems, setArrivalItems] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isErorr, setIsError] = useState(false)

    const [fromStorageTable, setFromStorageTable] = useState('')

    const fetchArrival = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('arrivals').select('*').eq('id', `${params.arrival_id}`)
        // @ts-ignore

        // if (data.length > 0) {
        //     // @ts-ignore
        //     setStorage(data[0].storage_name)
        // } else {
        //     setStorage('Поставка не найдена')
        //     setIsError(true)
        // }

        data?.map((item) => {
            setArrivalItems(item.items)

            item.items.map((i: any) => {
                console.log('Item', i)
            })
        })

        setIsLoading(false)


    }

    useEffect(() => {
        fetchArrival()
    }, [fromStorageTable])

    return (
        <>
            <Box mb={3}>
                <ButtonGroup>
                    <Link href={'/dashboard/arrivals/'}>
                        <Button size={`sm`}><ArrowBackIcon /> Назад</Button>
                    </Link>
                    <Button size={`sm`} colorScheme="green">Принять поставку</Button>
                </ButtonGroup>
            </Box>
            <Text fontSize={`2xl`}>Обзор поставки (ID: {params.arrival_id}) {isLoading ? <><Button disabled={true} size={`xs`} isLoading></Button></> : <><Button size={`xs`}><RepeatIcon /></Button></>}</Text>
            {isLoading ?
                <Loader />
                : arrivalItems.length < 1 ?
                    <TableEmpty /> :
                    <DataTable data={arrivalItems} setFromTable={setFromStorageTable} data_columns={[
                        'Артикул',
                        'Кол-во (шт)',
                    ]} data_actions={[

                    ]} />
            }
        </>
    )
}