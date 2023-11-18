import {
    Card,
    CardBody,
    Grid,
    Text
} from "@chakra-ui/react";
import AutoUsers from "@/components/Dashboard/Customers/AutoUsers";
import AddUser from "@/components/Dashboard/Customers/AddUser";

export default function Page() {
    return (
        <>
            <Text fontSize={`2xl`}>Добавить нового пользователя</Text>
            <>
                <Grid gap={4}>
                    <AddUser/>
                    <AutoUsers/>
                </Grid>
            </>
        </>
    )
}