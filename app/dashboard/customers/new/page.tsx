import {
    Card,
    CardBody,
    Flex,
    Text
} from "@chakra-ui/react";
import AutoUsers from "@/components/Dashboard/AutoUsers";

export default function Page() {
    return (
        <>
            <Text fontSize={`2xl`}>Добавить нового пользователя</Text>
            <>
                <Flex  minWidth={`max-content`} gap={4}>
                    <AutoUsers/>
                    <Card>
                        <CardBody>
                            Ручная регистрация
                        </CardBody>
                    </Card>
                </Flex>
            </>
        </>
    )
}