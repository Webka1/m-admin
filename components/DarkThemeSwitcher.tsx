'use client'

import {Button, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export default function DarkThemeSwitcher() {

   const { colorMode, toggleColorMode } = useColorMode()

   return(
       <Button type={'button'} onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon/> : <SunIcon/>}</Button>
   )
}
