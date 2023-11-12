'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {ChakraProvider, useColorMode} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "react-query";

export function Providers({
                              children
                          }: {
    children: React.ReactNode
}) {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    )
}