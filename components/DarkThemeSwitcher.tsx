'use client'

import {Button, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {DarkThemeSwitcherProps} from "@/utils/props";
export default function DarkThemeSwitcher({ variant }: DarkThemeSwitcherProps) {

   const { colorMode, toggleColorMode } = useColorMode()

   return(
       <>
          { variant === "button" ? (
              <Button type={'button'} onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon/> : <SunIcon/>}</Button>
          ) : variant === "link" ? (
              <Button variant={'link'} type={'button'} onClick={toggleColorMode}>{colorMode === "light" ? 'Темная тема' : 'Светлая тема'}</Button>
          ) : null }
       </>
   )
}
