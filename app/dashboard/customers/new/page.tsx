import {
    Card,
    CardBody,
    Grid,
    Text
} from "@chakra-ui/react";
import AutoUsers from "@/components/Dashboard/AutoUsers";

export default function Page() {
    return (
        <>
            <Text fontSize={`2xl`}>Добавить нового пользователя</Text>
            <>
                <Grid gap={4}>
                    <AutoUsers/>
                    <Card>
                        <CardBody>
                            Ручная регистрация
                        </CardBody>
                    </Card>
                </Grid>
            </>
        </>
    )
}