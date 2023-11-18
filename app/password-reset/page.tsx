'use client'
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Container,
    FormControl,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import {useState} from "react";
import {createBrowserClient} from "@supabase/ssr";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function PasswordReset() {

    const searchParams = useSearchParams()
    const url_error = searchParams.get('error_description')

    const [newPassword, setNewPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const changePassword = async () => {
        setIsLoading(true)
        const {data, error} = await supabase.auth.updateUser({ password: newPassword })

        if(error) {
            setSuccess('')
            setIsLoading(false)
            setError(error.message)
        } else {
            setIsLoading(false)
            setError('')
            setSuccess('Пароль успешно изменен!')
        }
    }

    return (
        <Container maxW={`400px`} mt={`4`}>
            <Card borderRadius={`md`} boxShadow={`lg`} p={'4'}>
                <CardBody mt={4} mb={4}>
                    <Text fontSize={`3xl`} as={`b`}>
                        Смена пароля
                    </Text>
                    { url_error ? <Alert mt={4} borderRadius={`md`} colorScheme={`red`}>{url_error}</Alert> : '' }
                    <FormControl mt={2}>
                        <FormLabel>Новый пароль</FormLabel>
                        <Input onChange={(e) => { setNewPassword(e.target.value) }} name={`password`} outline={`none`} type='password' placeholder={`********`}/>

                        { error ? <Alert mt={4} borderRadius={`md`} colorScheme={`red`}>{error}</Alert> : '' }
                        { success ? <Alert mt={4} borderRadius={`md`} colorScheme={`green`}>{success}</Alert> : '' }
                    </FormControl>

                    <ButtonGroup mt={4}>
                        <Link href={'/dashboard'}>
                            <Button variant={`ghost`}>На главную</Button>
                        </Link>
                        <Button isLoading={isLoading} onClick={changePassword} type={`submit`} colorScheme='green'>Изменить</Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </Container>
    )
}
