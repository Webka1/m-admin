import { Box, Text } from "@chakra-ui/react";

export default function TableEmpty() {
    return (
        <Box mt={4} textAlign={'center'} >
            <Text color={`gray`} fontSize={'xl'}>Здесь не на что смотреть 😔</Text>
        </Box >
    )
}