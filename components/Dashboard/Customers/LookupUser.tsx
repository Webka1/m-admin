import {
    Button,
    ButtonGroup,
    CircularProgress, Flex,
    FormControl,
    FormLabel,
    Input, Select,
    Stack,
    Tooltip,
    useDisclosure, useToast
} from "@chakra-ui/react";
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
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {createClient} from "@/utils/supabase/client";

type IProps = {
    uid: number
    setFromUserTable: any
}

export default function ({uid, setFromUserTable}: IProps) {

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
        setUser(customers[0])
        setIsLoading(false)
    }

    const [isEditUser, setIsEditUser] = useState(false)
    const [isEditUserLoading, setIsEditUserLoading] = useState()
    const [isUserEdited, setIsUserEdited] = useState(false)

    const [daiZvukEditUserBlyaaaaa, setDaiZvukEditUserBlyaaaaa] = useState('')

    function supermegapuperfunction() {
        setFromUserTable(daiZvukEditUserBlyaaaaa)
        setIsUserEdited(false)
    }

    const ref = useRef();

    return(
        <>
            <Tooltip label={`Посмотреть`}><Button onClick={() => { onOpen(); fetchUser() }} size={`sm`}><SearchIcon/></Button></Tooltip>
            { user ? <>
                <Modal isOpen={isOpen} onClose={() => {onClose(); supermegapuperfunction()}}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{isEditUser ? 'Редактирование' : 'Просмотр'} пользователя | ID: {uid}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            { isLoading ? <CircularProgress isIndeterminate/> : isEditUser ?
                                <EditUser setIsUserEdited={setIsUserEdited} setDaiZvukEditUserBlyaaaaa={setDaiZvukEditUserBlyaaaaa} setIsEditUserLoading={setIsEditUserLoading} ref={ref} user={user}/> : <UserInfo user={user}/>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <ButtonGroup>
                                {/*@ts-ignore*/}
                                { isEditUser ? isUserEdited ? <Button  isLoading={isEditUserLoading} onClick={() => ref.current.saveUser()} colorScheme={`green`}>Сохранить</Button> : '' : <Button onClick={() => setIsEditUser(true)} colorScheme={`orange`}>Редактировать</Button> }
                                { isEditUser ? <Button colorScheme={`red`} onClick={() => setIsEditUser(false)}>Отмена</Button> : null }
                                <Button onClick={() => { onClose(); supermegapuperfunction() }}>
                                    Закрыть
                                </Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </> : null }
        </>
    )
}

const UserInfo = ({user}: any) => {

    return(
        <Stack>
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
}

const EditUser = forwardRef(({user, setIsEditUserLoading, setDaiZvukEditUserBlyaaaaa, setIsUserEdited}: any, ref) => {
    const supabase = createClient()

    const [editableUser, setEditableUser] = useState({
        firstname: user.user_firstname,
        lastname: user.user_lastname,
        email: user.user_email,
        phone: user.user_phone,
        bday: user.user_birthday,
        city: user.user_city,
        discount: user.user_discount,
        is_confirmed: user.user_is_confirmed,
        is_banned: user.user_is_banned,
        is_deleted: user.is_deleted,
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEditableUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        setIsUserEdited(true)
    }

    const toast = useToast()

    async function saveUser() {
        setIsEditUserLoading(true)
        try {
            const { error} = await supabase.from('customers').update({
                user_firstname: editableUser.firstname,
                user_lastname: editableUser.lastname,
                user_email: editableUser.email,
                user_phone: editableUser.phone,
                user_birthday: editableUser.bday,
                user_city: editableUser.city,
                user_discount: editableUser.discount,
                user_is_confirmed: editableUser.is_confirmed,
                user_is_banned: editableUser.is_banned,
                is_deleted: editableUser.is_deleted,
            }).eq('id', user.id)

            if(!error) {
                setIsEditUserLoading(false)

                toast({
                    title: 'Успешно.',
                    description: "Аккаунт отредактирован.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setDaiZvukEditUserBlyaaaaa('updated userrrr | from child component')
            } else {
                setIsEditUserLoading(false)

                console.log(error)

                toast({
                    title: 'Ошибка.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (e) {
            setIsEditUserLoading(false)
            console.log(e)
        }
    }

    useImperativeHandle(ref, () => ({
        saveUser
    }));

    return(
        <Stack>
            <Flex gap={2}>
                <FormControl>
                    <FormLabel>Имя</FormLabel>
                    <Input name={`firstname`} onChange={handleChange} defaultValue={`${editableUser.firstname}`} />
                </FormControl>
                <FormControl>
                    <FormLabel>Фамилия</FormLabel>
                    <Input name={`lastname`} onChange={handleChange} defaultValue={`${editableUser.lastname}`} />
                </FormControl>
            </Flex>
            <FormControl>
                <FormLabel>Почта</FormLabel>
                <Input name={`email`} onChange={handleChange} defaultValue={`${editableUser.email}`} />
            </FormControl>
            <FormControl>
                <FormLabel>Телефон</FormLabel>
                <Input name={`phone`} onChange={handleChange} defaultValue={editableUser.phone} />
            </FormControl>
            <FormControl>
                <FormLabel>День рождения (YYYY-MM-DD)</FormLabel>
                <Input name={`bday`} onChange={handleChange} defaultValue={`${editableUser.bday}`} />
            </FormControl>
            <FormControl>
                <FormLabel>Город</FormLabel>
                <Input name={`city`} onChange={handleChange} defaultValue={`${editableUser.city}`} />
            </FormControl>
            <FormControl>
                <FormLabel>Скидка пользователя (%) | 10=10%</FormLabel>
                <Input name={`discount`} onChange={handleChange} defaultValue={`${editableUser.discount}`} />
            </FormControl>
            <Flex gap={2}>
                <FormControl>
                    <FormLabel>Подтвержден</FormLabel>
                    <Select name={`is_confirmed`} onChange={handleChange} defaultValue={editableUser.is_confirmed}>
                        <option value={`true`}>Да</option>
                        <option value={`false`}>Нет</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Забанен</FormLabel>
                    <Select name={`is_banned`} onChange={handleChange} defaultValue={editableUser.is_banned}>
                        <option value={`${true}`}>Да</option>
                        <option value={`${false}`}>Нет</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Удален</FormLabel>
                    <Select name={`is_deleted`} onChange={handleChange} defaultValue={editableUser.is_deleted}>
                        <option value='true'>Да</option>
                        <option value='false'>Нет</option>
                    </Select>
                </FormControl>
            </Flex>
        </Stack>
    )
})