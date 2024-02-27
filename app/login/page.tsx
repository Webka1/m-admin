'use client'

import {
  Alert, Box,
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
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DarkThemeSwitcher from "@/components/DarkThemeSwitcher";
import ResetPasswordModal from "@/components/ResetPasswordModal";

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string>('')

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const router = useRouter()
  const getAuthInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.email) {
      return router.push('/dashboard')
    }
  }

  useEffect(() => {
    getAuthInfo()
  }, [])

  const signIn = async () => {
    setIsAuthLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setIsAuthLoading(false)
      setAuthError(error.message)
    } else {
      return router.push('/dashboard')
    }
  }

  return (
    <Container maxW={`400px`} mt={`4`}>
      <Card borderRadius={`md`} boxShadow={`lg`} p={'4'}>
        <CardBody mt={4} mb={4}>
          <Text fontSize={`3xl`} as={`b`}>
            Авторизация
          </Text>
          <FormControl mt={8}>
            <FormLabel>Почта</FormLabel>
            <Input onChange={(e) => { setEmail(e.target.value) }} outline={`none`} name={`email`} type='text' autoComplete={`false`} placeholder={`example@example.com`} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Пароль</FormLabel>
            <Input onChange={(e) => { setPassword(e.target.value) }} name={`password`} outline={`none`} type='password' placeholder={`********`} />
          </FormControl>

          <ButtonGroup mt={4}>
            <Button isLoading={isAuthLoading} onClick={signIn} type={`submit`} colorScheme='green'>Войти</Button>
            <ResetPasswordModal />
          </ButtonGroup>

          {authError ? (
            <Alert mt={4} colorScheme={`red`} borderRadius={`md`}>{authError}</Alert>
          ) : null}
        </CardBody>
      </Card>
      <Box mt={2}>
        <DarkThemeSwitcher variant={`link`} />
      </Box>
    </Container>
  )
}
