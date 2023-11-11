'use client'

import {
    Box,
    Button, ButtonGroup,
    Flex, Menu, MenuButton, MenuItem, MenuList,
    Spacer,
    Text
} from "@chakra-ui/react";
import DarkThemeSwitcher from "@/components/DarkThemeSwitcher";
import {createBrowserClient} from "@supabase/ssr";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {IMenuLink} from "@/utils/interface";
import MenuLinks from "@/MenuLinks";
import {CheckIcon} from "@chakra-ui/icons";

export default function Navbar() {
    return (
        <Box border={`1px`} borderColor={`gray.300`} shadow={`md`} p={4} rounded={`lg`} mt={4}>
            <Flex alignItems={`center`}>
                <Box>
                    <Text as={`b`}>Панель Администратора</Text>
                </Box>
                <Spacer/>
                <Box>
                    <NavLinks/>
                </Box>
                <Spacer/>
                <Box>
                    <ButtonGroup>
                        <DarkThemeSwitcher variant={`button`}/>
                        <Button colorScheme={`orange`}>Настройки</Button>
                        <SignOutButton/>
                    </ButtonGroup>
                </Box>
            </Flex>
        </Box>
    )
}


const NavLinks = () => {

    const pathname = usePathname()

    console.log(pathname)

    return (
        <ButtonGroup>
            {MenuLinks.map((link: IMenuLink, index: number) => {
                return(
                    link.is_single ? (
                            // @ts-ignore
                            <Link key={index} href={link.url}>
                                <Button colorScheme={pathname === link.url ? 'blue' : 'gray'}>{link.name}</Button>
                            </Link>
                        ) : (
                        <Menu key={index}>
                            <MenuButton colorScheme={pathname.includes(link.prefix as string) ? 'blue' : 'gray'} as={Button}>{link.name}</MenuButton>
                            <MenuList>
                                {link.links?.map((sublink, index) => {
                                    return(
                                        <MenuItem key={index}>
                                            <Link aria-disabled={true} href={'/dashboard' + link.prefix + sublink.url}>
                                                {sublink.name}
                                            </Link>
                                        </MenuItem>
                                    )
                                })}
                            </MenuList>
                        </Menu>
                    )
                )
            })}
        </ButtonGroup>
    )
}


const SignOutButton = () => {
    const router = useRouter()

    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()

        if(error) {
            alert(error.message) // Debug
        }

        return router.push('/login')
    }

    return(
        <Button onClick={signOut} colorScheme={`red`}>Выйти</Button>
    )
}