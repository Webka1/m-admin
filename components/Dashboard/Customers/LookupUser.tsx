import {Button, CircularProgress, FormControl, FormLabel, Input, Stack, Tooltip, useDisclosure} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {useState} from "react";
import {createClient} from "@/utils/supabase/client";

type IProps = {
    uid: number
}

export default function ({uid}: IProps) {

    const supabase = createClient()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchUser = async () => {
        setIsLoading(true)
        const {data: customers, error} = await supabase.from(`customers`).select().eq('id', uid)

        if(error) {
            console.log(error)
        }

        // @ts-ignore
        setUser(customers)
        setIsLoading(false)
    }

    return(
        <>
            <Tooltip label={`Посмотреть`}><Button onClick={() => { onOpen(); fetchUser() }} size={`sm`}><SearchIcon/></Button></Tooltip>
            { user ? <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Просмотр пользователя | ID: {uid}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            { isLoading ? <CircularProgress isIndeterminate/> :
                                <UserInfo user={user}/>
                            }
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose}>
                                Закрыть
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </> : null }
        </>
    )
}

const UserInfo = ({user}: any) => {
    return(
        user.map((user: any, index: number) => {
            return(
                <Stack key={index}>
                    <FormControl>
                        <FormLabel>Имя Фамилия</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_firstname} ${user.user_lastname}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Почта</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_email}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Телефон</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_phone}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>День рождения</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_birthday}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Город</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_city}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Скидка пользователя</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_discount}%`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Подтвержден | Забанен | Удален</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_is_confirmed} | ${user.user_is_banned} | ${user.is_deleted}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Reg IP | Last IP</FormLabel>
                        <Input isReadOnly={true} value={`${user.user_reg_ip} | ${user.user_last_ip}`} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Дата регистрации</FormLabel>
                        <Input isReadOnly={true} value={`${user.registred_date}`} />
                    </FormControl>
                </Stack>
            )
        })
    )
}