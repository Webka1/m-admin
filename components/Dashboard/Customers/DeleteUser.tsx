'use client'
import {Button, Tooltip, useToast} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, LockIcon, UnlockIcon} from "@chakra-ui/icons";
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
import {TDeleteUser} from "@/utils/props";

export default function ({uid, is_deleted, setFromUserTable}: TDeleteUser) {

    const supabase = createClient()

    const toast = useToast()

    const [isDeleted, setIsDeleted] = useState(is_deleted)
    const [loading, setLoading] = useState(false)

    const changeDeleteStatus = async () => {
        try {
            setLoading(true)
            const { error} = await supabase.from('customers').update({
                is_deleted: !isDeleted
            }).eq('id', uid)

            if(!error) {
                toast({
                    title: 'Успешно.',
                    description: "Статус аккаунта изменен.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                setIsDeleted(!isDeleted)
                setFromUserTable('wek' + new Date())
                setLoading(false)
            } else {
                toast({
                    title: 'Ошибка.',
                    description:error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })

                setIsDeleted(is_deleted)
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
            { isDeleted ? <Tooltip label={`Вернуть`}><Button onClick={changeDeleteStatus} colorScheme={`green`} size={`sm`}><AddIcon/></Button></Tooltip> : <Tooltip label={`Удалить`}><Button isLoading={loading} onClick={changeDeleteStatus} colorScheme={`red`} size={`sm`}><DeleteIcon/></Button></Tooltip> }
        </>
    )
}