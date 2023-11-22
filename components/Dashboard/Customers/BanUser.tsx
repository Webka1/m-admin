'use client'
import {Button, Tooltip, useToast} from "@chakra-ui/react";
import {LockIcon, UnlockIcon} from "@chakra-ui/icons";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
import {TBanUser} from "@/utils/props";

export default function ({uid, is_banned, setFromUserTable}: TBanUser) {

    const supabase = createClient()

    const toast = useToast()

    const [isBanned, setIsBanned] = useState(is_banned)
    const [loading, setLoading] = useState(false)

    const changeBanStatus = async () => {
        try {
            setLoading(true)
            const { error} = await supabase.from('customers').update({
                user_is_banned: isBanned !== 'true'
            }).eq('id', uid)

            if(!error) {
                toast({
                    title: 'Успешно.',
                    description: "Статус аккаунта изменен.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setIsBanned(`${isBanned !== 'true' }`)

                setLoading(false)

                setFromUserTable('upd ban' + new Date())
            } else {
                toast({
                    title: 'Ошибка.',
                    description:error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })

                setLoading(false)
                console.log(error)
            }

        } catch (e: any) {
            console.log(e)
            alert(e.message)
        }
    }

    return(
        <>
            {
                isBanned === 'true' ?
                    <Tooltip label={`Разбанить`}><Button isLoading={loading} size={`sm`} onClick={changeBanStatus} colorScheme={`green`}><UnlockIcon/></Button></Tooltip> :
                    <Tooltip label={`Забанить`}><Button isLoading={loading} size={`sm`} onClick={changeBanStatus} colorScheme={`orange`}><LockIcon/></Button></Tooltip>
            }
        </>
    )
}