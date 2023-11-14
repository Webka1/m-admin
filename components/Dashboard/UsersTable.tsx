'use client'

import {
    Button,
    ButtonGroup,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {useState} from "react";

export default function UsersTable({customers}: any) {
    const [startIndex,  setStartIndex] = useState(0)
    const [endIndex,  setEndIndex] = useState(5)

    const [currentPage, setCurrentPage] = useState(1)

    const usersPerPage = 10
    const lastIndex = currentPage * usersPerPage
    const firstIndex = lastIndex - usersPerPage
    const users = customers?.slice(firstIndex, lastIndex)
    const pageNumber = Math.ceil(customers?.length / usersPerPage)
    // @ts-ignore
    const numbers = [...Array(pageNumber + 1).keys()].slice(1)

    const prevPage = () => {
        if(currentPage !== firstIndex) {
            setStartIndex(prevState => prevState - 1)
            setEndIndex(prevState => prevState - 1)

            setCurrentPage(currentPage - 1)
        }
    }

    const setPage = (page: number) => {
        setCurrentPage(page)
    }

    const nextPage = () => {
        if(currentPage !== lastIndex) {
            setStartIndex(prevState => prevState + 1)
            setEndIndex(prevState => prevState + 1)

            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <TableContainer mt={4}>
                <Table variant='simple'>
                    <TableCaption>
                        <ButtonGroup gap='2'>
                            <Button isDisabled={currentPage >= firstIndex} onClick={() => setPage(1)}>В начало</Button>
                            <Button isDisabled={currentPage >= firstIndex} onClick={prevPage}>Назад</Button>
                            {numbers.slice(startIndex, endIndex).map((number, index) => (
                                <Button colorScheme={currentPage === number ? 'blue' : 'gray'} onClick={() => setPage(number)} key={index}>{number}</Button>
                            ))}
                            <Button isDisabled={currentPage >= pageNumber} onClick={nextPage}>Вперед</Button>
                            <Button isDisabled={currentPage >= pageNumber} onClick={() => setPage(pageNumber)}>В конец</Button>
                        </ButtonGroup>
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>ФИО</Th>
                            <Th>Почта</Th>
                            <Th>Телефон</Th>
                            <Th>Дата регистрации</Th>
                            <Th>Подтвержден | Бан</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        { users?.map((customer: any,  index: number) => (
                            <Tr key={index}>
                                <Td>{customer.id}</Td>
                                <Td>{customer.user_firstname} {customer.user_lastname}</Td>
                                <Td>{customer.user_email}</Td>
                                <Td>{customer.user_phone}</Td>
                                <Td>{customer.registred_date}</Td>
                                <Td>
                                    {customer.user_is_confirmed ? (
                                        <Tag colorScheme={`green`}>Да</Tag>
                                    ) : (
                                        <Tag colorScheme={`blue`}>Нет</Tag>
                                    )}
                                    &nbsp;
                                    {customer.user_is_banned ? (
                                        <Tag colorScheme={`red`}>Да</Tag>
                                    ) : (
                                        <Tag colorScheme={`green`}>Нет</Tag>
                                    )}
                                </Td>
                            </Tr>
                        )) }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>ID</Th>
                            <Th>ФИО</Th>
                            <Th>Почта</Th>
                            <Th>Телефон</Th>
                            <Th>Дата регистрации</Th>
                            <Th>Подтвержден | Бан</Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}