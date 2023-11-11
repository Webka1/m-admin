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
import {useRouter} from "next/navigation";
import Link from "next/link";
import {IMenuLink} from "@/utils/interface";
import MenuLinks from "@/MenuLinks";

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
                        <Button>Настройки</Button>
                        <SignOutButton/>
                    </ButtonGroup>
                </Box>
            </Flex>
        </Box>
    )
}


const NavLinks = () => {

    return (
        <ButtonGroup>
            {MenuLinks.map((link: IMenuLink) => {
                return(
                    link.is_single ? (
                            // @ts-ignore
                            <Link href={link.url}>
                                <Button>{link.name}</Button>
                            </Link>
                        ) : (
                        <Menu>
                            <MenuButton as={Button}>{link.name}</MenuButton>
                            <MenuList>
                                {link.links?.map((sublink) => {
                                    return(
                                        <MenuItem>
                                            <Link href={sublink.url}>{sublink.name}</Link>
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