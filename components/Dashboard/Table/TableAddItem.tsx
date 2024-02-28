import { createClient } from "@/utils/supabase/client";
import { Box, Button, ButtonGroup, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TableAddItem({ current_storage, setFromStorageTable }: any) {

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const supabase = createClient()

    const [fromStorageTable_, setFromStorageTable_] = useState('') // default value
    const [storages, setStorages] = useState([])

    const [selectFrom, setSelectFrom] = useState('main_storage')
    const [selectWhere, setSelectWhere] = useState(current_storage)

    const [itemsInStorageFrom, setItemsInStorageFrom] = useState([])
    const [itemFromStorage, setItemFromStorage] = useState('')
    const [quantity, setQuantity] = useState(0)

    const [isAddButtonLoading, setIsAddButtonLoading] = useState(false)


    const [itemsInStorageWhere, setItemsInStorageWhere] = useState([])

    const fetchStorages = async () => {
        const { data } = await supabase.from('storage').select('storage_name, storage_code').order('id', { ascending: true })

        // @ts-ignore
        setStorages(data)
    }

    const fetchItemsFrom = async () => {
        console.log(selectFrom)

        const { data } = await supabase.from('items_in_storage').select('item_sku(*), quantity, price, storage_code').eq('storage_code', selectFrom)
        // @ts-ignore
        setItemsInStorageFrom(data)
    }

    const fetchItemsWhere = async () => {
        const { data } = await supabase.from('items_in_storage').select('item_sku(*), quantity, price, storage_code').eq('storage_code', selectWhere)
        // @ts-ignore
        setItemsInStorageWhere(data)
    }

    const selectStorageFrom = (storage: any) => {
        setSelectFrom(storage)

        fetchItemsFrom()
    }

    useEffect(() => {
        fetchStorages()
    }, [fromStorageTable_])

    useEffect(() => {
        fetchItemsFrom()
        fetchItemsWhere()
    }, [selectFrom])

    useEffect(() => {

    }, [itemFromStorage])



    const addItemInStorage = async () => {

        if (!itemFromStorage || !quantity) {
            toast({
                title: 'Ошибка.',
                description: "Не выбран товар или количество.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            // @ts-ignore
            if (quantity > itemsInStorageFrom.filter((item: any) => item.item_sku.item_sku === itemFromStorage)[0].quantity) {
                toast({
                    title: 'Ошибка.',
                    description: "Количество не должно превышать доступное количество.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            } else if (quantity <= 0) {
                toast({
                    title: 'Ошибка.',
                    description: "Количество не может быть меньше или равно нулю.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                setIsAddButtonLoading(true)

                const addItemToStorageWhere = await supabase.from('items_in_storage').insert([
                    {
                        storage_code: selectWhere,
                        item_sku: itemFromStorage,
                        quantity: quantity,
                        // @ts-ignore
                        price: itemsInStorageFrom.filter((item: any) => item.item_sku.item_sku === itemFromStorage)[0].price
                    }
                ])

                // @ts-ignore
                const newCount = itemsInStorageFrom.filter((item: any) => item.item_sku.item_sku === itemFromStorage)[0].quantity - quantity

                console.log(`New Count `, newCount)
                console.log(`Storage_code from`, selectFrom)
                console.log(`Item SKU`, itemFromStorage)

                const updateCountInStorageFrom = await supabase.from('items_in_storage').update({
                    quantity: newCount
                }).eq('storage_code', selectFrom).eq('item_sku', itemFromStorage)

                if (addItemToStorageWhere && updateCountInStorageFrom) {
                    toast({
                        title: 'Успешно.',
                        description: 'Товар добавлен на склад.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })

                    setIsAddButtonLoading(false)

                    setFromStorageTable('update')
                    fetchItemsFrom()
                    fetchItemsWhere()

                    onClose()
                }
            }
        }
    }


    // TODO: Сделать проверку на ноль блять)


    return (
        <>
            <Button colorScheme="green" size={`sm`} onClick={onOpen}>Добавить товар</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Добавить товар вручную</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Text>Откуда</Text>
                            <Select onChange={(e) => selectStorageFrom(e.target.value)} mt={2}>
                                {storages.map((storage: any) => {
                                    return <option key={storage.storage_code} disabled={storage.storage_code === current_storage} value={storage.storage_code}>{storage.storage_name}</option>
                                })}
                            </Select>
                        </Box>
                        <Box mt={4}>
                            <Text>Куда</Text>
                            <Select onChange={(e) => setSelectWhere(e.target.value)} mt={2}>
                                {storages.map((storage: any) => {
                                    if (storage.storage_code === current_storage) return <option disabled={storage.storage_code === selectWhere || current_storage} selected={storage.storage_code === current_storage} key={storage.storage_code} value={storage.storage_code}>{storage.storage_name}</option>
                                })}
                            </Select>
                        </Box>
                        {itemsInStorageFrom?.length ?
                            <>

                                <Box mt={4}>
                                    <Text>Выбрать товары</Text>
                                    <Select onChange={(e) => setItemFromStorage(e.target.value)} placeholder="Выбрать товары" mt={2}>

                                        {
                                            // find non similar items in storage From and storage Wheere
                                            itemsInStorageFrom.map((item: any) => {
                                                // @ts-ignore
                                                const similarItem = itemsInStorageWhere.filter((itemWhere: any) => itemWhere.item_sku.item_sku === item.item_sku.item_sku)
                                                if (!similarItem.length) {
                                                    return <option key={item.item_sku.item_sku} value={item.item_sku.item_sku}>{item.item_sku.item_title}</option>
                                                }
                                            })
                                        }
                                    </Select>
                                </Box>

                            </> : null}
                        {itemFromStorage ?

                            <>
                                <Box mt={4}>
                                    <Text>Количество (Доступно: {

                                        // @ts-ignore
                                        itemsInStorageFrom.filter((item: any) => item.item_sku.item_sku === itemFromStorage)[0].quantity

                                    })</Text>
                                    {/* @ts-ignore */}
                                    <Input onInput={(e) => setQuantity(e.target.value)} mt={2} placeholder={`Кол-во (Максимум: ${itemsInStorageFrom.filter((item: any) => item.item_sku.item_sku === itemFromStorage)[0].quantity})`} size='md' />
                                </Box>
                            </>

                            : null}
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button isLoading={isAddButtonLoading} onClick={addItemInStorage} colorScheme="green">Добавить</Button>
                            <Button colorScheme='red' mr={3} onClick={onClose}>
                                Закрыть
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}