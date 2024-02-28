import { createClient } from "@/utils/supabase/client";
import { Box, Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, Input, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function TableAddStorage({ setFromStorageTable }: any) {

    const supabase = createClient()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)

    const [storageName, setStorageName] = useState('')
    const [storageCode, setStorageCode] = useState('')

    const createStorage = async () => {
        setIsLoading(true)

        if (storageName === '' || storageCode === '') {
            toast({
                title: 'Ошибка',
                description: 'Заполните все поля',
                status: 'error',
                duration: 3000,
                isClosable: true
            })

            setIsLoading(false)
        } else {
            // @ts-ignore
            const { error } = await supabase.from('storage').insert({ storage_name: storageName, storage_code: storageCode })

            if (error) {
                toast({
                    title: 'Ошибка',
                    description: 'Произошла ошибка при создании склада',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })

                setIsLoading(false)
            } else {
                toast({
                    title: 'Успешно',
                    description: 'Склад успешно создан',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })

                setIsLoading(false)

                setStorageName('')
                setStorageCode('')

                setFromStorageTable('reload')

                onClose()
            }
        }
    }

    return (
        <>
            <Button colorScheme="green" size={`sm`} onClick={onOpen}>Cоздать новый склад</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Создать новый склад</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Text>Название склада</Text>
                            {/* @ts-ignore */}
                            <Input onChange={(e) => setStorageName(e.target.value)} mt={2} placeholder={`Напимер: Торговый зал`} size='md' />
                        </Box>
                        <Box mt={4}>
                            <Text>Код склада</Text>
                            {/* @ts-ignore */}
                            <Input onChange={(e) => setStorageCode(e.target.value)} mt={2} placeholder={`Напимер: shopping_storage`} size='md' />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button isLoading={isLoading} onClick={createStorage} colorScheme="green">Создать</Button>
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