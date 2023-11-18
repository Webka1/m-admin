'use client'

import {
    Button,
    ButtonGroup,
    Center,
    CloseButton,
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
import {ICustomer} from "@/utils/interface";
import EditUser from "@/components/Dashboard/Customers/EditUser";
import BanUser from "@/components/Dashboard/Customers/BanUser";
import {TUserTable} from "@/utils/props";
import DeleteUser from "@/components/Dashboard/Customers/DeleteUser";
import LookupUser from "@/components/Dashboard/Customers/LookupUser";
export default function UsersTable({ customers, setFromUserTable }: TUserTable) {
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
            <UserTable
                pagination={
                    <>
                        <Center mb={4}>
                            Данных получено: {customers?.length}
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
                        { users?.map((customer: ICustomer,  index: number) => (
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
                                </Td>
                                <Td>
                                    <ButtonGroup>
                                        <LookupUser uid={customer.id}/>
                                        <EditUser uid={customer.id}/>
                                        <BanUser setFromUserTable={setFromUserTable} is_banned={`${customer.user_is_banned}`} uid={customer.id}/>
                                        <DeleteUser is_deleted={customer.is_deleted} setFromUserTable={setFromUserTable}
                                                    uid={customer.id}/>
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        )) }
                    </>
                }
            />
        </>
    )
}

// @ts-ignore
const UserTable = ({pagination, row}) => {
    return (
        <TableContainer mt={4}>
            <Table variant='simple'>
                <TableCaption>
                    {pagination}
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>ФИО</Th>
                        <Th>Почта</Th>
                        <Th>Телефон</Th>
                        <Th>Дата регистрации</Th>
                        <Th>Подтвержден</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {row}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>ФИО</Th>
                        <Th>Почта</Th>
                        <Th>Телефон</Th>
                        <Th>Дата регистрации</Th>
                        <Th>Подтвержден</Th>
                        <Th></Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}