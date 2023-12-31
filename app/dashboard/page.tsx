import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Stats from "@/components/Dashboard/Stats";

export default async function Index() {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser()


    return (
        <>
            <Stats/>
        </>
    )
}
