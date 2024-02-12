import { Box, Button, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    // <div>
    //   <h2>Not Found</h2>
    //   <p>Could not find requested resource</p>
    //   <Link href="/">Return Home</Link>
      // </div>
    <Center mt={'25vh'} color='white'>
        <Box textAlign={'center'}>
            <Text fontSize={'5xl'} fontWeight={'bold'}>Модуль недоступен 😔</Text>
            <Text mt={'1em'} color={'gray'} fontSize={'xl'} fontWeight={'normal'}>Запрашиваемый модуль недоступен. <br/> Возможно, у Вас нет прав или модуль находится в разработке.</Text>
            <Link href='/'>
                <Button mt={'1em'}>
                    Вернуться
                </Button>
            </Link>
        </Box>
    </Center>
  )
}