import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Панель Администрирования',
    description: 'Для $$$KURS4CH$$$',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if(!user?.email) {
        redirect('/login')
    }


    return (
        <div>
            {children}
        </div>
    )
}
