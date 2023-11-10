import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import {Alert, Box, Button, Container, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";

export default async function Login({
                                      searchParams,
                                    }: {
  searchParams: { message: string }
}) {

  const cookieStore = cookies()

  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(user?.email) {
    redirect('/dashboard')
  }

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Invalid login or password')
    }

    return redirect('/dashboard')
  }

  // @ts-ignore
  return (
      <Container maxW={`400px`} mt={`4`}>
        <Box bg={`white`} borderRadius={`md`} boxShadow={`lg`} p={'4'}>
          <Text fontSize={`3xl`} as={`b`}>
            Авторизация
          </Text>
          <Box mt={4} mb={4}>
            <form action={signIn}>
              <FormControl>
                <FormLabel>Почта</FormLabel>
                <Input outline={`none`} name={`email`} type='text' autoComplete={`false`} placeholder={`example@example.com`} />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Пароль</FormLabel>
                <Input name={`password`} outline={`none`} type='password' placeholder={`********`}/>
              </FormControl>
              <Button mt={4} type={`submit`} colorScheme='green'>Войти</Button>
            </form>

            {searchParams?.message && (
                <Alert borderRadius={`md`} mt={4} colorScheme={`red`}>{searchParams.message}</Alert>
            )}
          </Box>
        </Box>
      </Container>
  )
}
