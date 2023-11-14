'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {Box, Text} from "@chakra-ui/react";

export default function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <Box>
            <Text>
                SUKa mamy ebal xuini etoy
            </Text>
        </Box>
    )
}