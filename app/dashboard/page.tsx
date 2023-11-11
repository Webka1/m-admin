import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import AuthButton from "@/components/AuthButton";

export default async function Index() {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser()


    return (
        <>
            Hel(o)
        </>
    )
}
