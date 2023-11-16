'use client'
import {Button, Tooltip, useToast} from "@chakra-ui/react";
import {LockIcon, UnlockIcon} from "@chakra-ui/icons";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

type IProps = {
    uid: number,
    is_banned: string,
}

export default function ({uid, is_banned}: IProps) {

    const supabase = createClient()

    const toast = useToast()

    const [isBanned, setIsBanned] = useState(is_banned)
    const [loading, setLoading] = useState(false)

    const changeBanStatus = async () => {
        try {
            setLoading(true)
            const { error} = await supabase.from('customers').update({
                user_is_banned: is_banned !== 'true'
            }).eq('id', uid)

            if(!error) {
                toast({
                    title: 'Успешно.',
                    description: "Статус аккаунта изменен. Обновите страницу",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setIsBanned(`${isBanned !== 'true' }`)

                setLoading(false)
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

    useEffect(() => {
        console.log(isBanned)
        console.log(typeof isBanned)
    }, [isBanned])

    return(
        <>
            {
                isBanned === 'true' ?
                    <Tooltip label={`Разбанить пользователя`}><Button isLoading={loading} size={`sm`} onClick={changeBanStatus} colorScheme={`green`}><UnlockIcon/></Button></Tooltip> :
                    <Tooltip label={`Забанить пользователя`}><Button isLoading={loading} size={`sm`} onClick={changeBanStatus} colorScheme={`orange`}><LockIcon/></Button></Tooltip>
            }
        </>
    )
}