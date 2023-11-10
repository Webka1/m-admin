import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(user?.email) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }

  return (
    <div>
      Проверяю авторизацию!
    </div>
  )
}
