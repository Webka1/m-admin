'use client'
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Alert, Button, Input, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import {createBrowserClient} from "@supabase/ssr";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export default function ResetPasswordModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const resetPassword = async() => {
        setIsLoading(true)

        try {
            const {error} = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${defaultUrl}/password-reset`
            })
            if(error) {
                setSuccess('')
                setIsLoading(false)
                setError(error.message)
            } else {
                setError('')
                setIsLoading(false)
                setSuccess('Если такой аккаунт существует - письмо для восстановления пароля придет на почту')
            }

        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    return (
       <>

           <Button variant={`ghost`} onClick={onOpen}>Восстановить пароль</Button>

           <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                   <ModalHeader>Восстановление пароля</ModalHeader>
                   <ModalCloseButton />
                   <ModalBody>
                       <Input onChange={(e) => setEmail(e.target.value)} placeholder={`Введите e-mail`}/>

                       { error ? <Alert mt={4} borderRadius={`md`} colorScheme={`red`}>{error}</Alert> : '' }
                       { success ? <Alert mt={4} borderRadius={`md`} colorScheme={`green`}>{success}</Alert> : '' }
                   </ModalBody>
                   <ModalFooter>
                       <Button variant={`ghost`} colorScheme='red' mr={3} onClick={onClose}>
                           Закрыть
                       </Button>
                       <Button isLoading={isLoading} onClick={resetPassword} colorScheme={`blue`}>Восстановить</Button>
                   </ModalFooter>
               </ModalContent>
           </Modal>

       </>
    )
}