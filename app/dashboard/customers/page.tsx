import { createClient } from '@/utils/supabase/server'
import {Text} from "@chakra-ui/react";
import {cookies} from "next/headers";
import UsersTable from "@/components/Dashboard/UsersTable";

export default async function Customers() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: customers } = await supabase.from('customers').select()

    return (
        <>
            <Text fontSize={`2xl`}>Все пользователи</Text>
            <UsersTable customers={customers}/>
        </>
    )
}