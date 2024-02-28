'use client'

import {
    Button,
    ButtonGroup,
    Center,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useState } from "react";
import { ICustomer } from "@/utils/interface";
import { TTable } from "@/utils/props";


export default function DataTable({ data, setFromTable, data_columns, data_actions }: TTable) {
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(5)

    const [currentPage, setCurrentPage] = useState(1)

    const dataPerPage = 10
    const lastIndex = currentPage * dataPerPage
    const firstIndex = lastIndex - dataPerPage
    const data_ = data?.slice(firstIndex, lastIndex)
    const pageNumber = Math.ceil(data?.length / dataPerPage)
    // @ts-ignore
    const numbers = [...Array(pageNumber + 1).keys()].slice(1)

    const prevPage = () => {
        if (currentPage !== firstIndex) {
            setStartIndex(prevState => prevState - 1)
            setEndIndex(prevState => prevState - 1)

            setCurrentPage(currentPage - 1)
        }
    }

    const setPage = (page: number) => {
        setCurrentPage(page)
    }

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setStartIndex(prevState => prevState + 1)
            setEndIndex(prevState => prevState + 1)

            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <UserTable
                pagination={
                    <>
                        <Center mb={4}>
                            Данных получено: {data?.length}
                        </Center>
                        <ButtonGroup gap='2'>
                            <Button isDisabled={currentPage >= firstIndex} onClick={() => setPage(1)}>В начало</Button>
                            <Button isDisabled={currentPage >= firstIndex} onClick={prevPage}>Назад</Button>
                            {numbers.slice(startIndex, endIndex).map((number, index) => (
                                <Button colorScheme={currentPage === number ? 'blue' : 'gray'} onClick={() => setPage(number)} key={index}>{number}</Button>
                            ))}
                            <Button isDisabled={currentPage >= pageNumber} onClick={nextPage}>Вперед</Button>
                            <Button isDisabled={currentPage >= pageNumber} onClick={() => setPage(pageNumber)}>В конец</Button>
                        </ButtonGroup>
                    </>
                }

                row={
                    <>
                        {
                            data_?.map((column: any, index: number) => (
                                <Tr key={index}>
                                    {Object.keys(column).map((key, index) => (
                                        <Td key={index}>{column[key]}</Td>
                                    ))}


                                    {data_actions?.length ?
                                        <Td>
                                            <ButtonGroup>
                                                {data_actions?.map((action: any, index: number) => (
                                                    <Button colorScheme={action.color} key={index} size={`sm`} onClick={() => setFromTable({
                                                        action: action.action,
                                                        id: column.storage_code || column.id
                                                    })}>{action.name}</Button>
                                                ))}
                                            </ButtonGroup>
                                        </Td>
                                        :
                                        null
                                    }
                                </Tr>
                            ))
                        }
                    </>
                }

                columns={data_columns}
            />
        </>
    )
}

// @ts-ignore
const UserTable = ({ pagination, row, columns }) => {
    return (
        <TableContainer mt={4}>
            <Table variant='simple'>
                <TableCaption>
                    {pagination}
                </TableCaption>
                <Thead>
                    <Tr>
                        {columns.map((column_name: string, index: number) => (
                            <Th key={index}>
                                {column_name}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {row}
                </Tbody>
            </Table>
        </TableContainer>
    )
}