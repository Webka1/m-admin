import Navbar from "@/components/Navbar";
import {Container} from "@chakra-ui/react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: process.env.ADMIN_NAME,
    description: 'Для $$$KURS4CH$$$',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <>
            <Container maxW={`container.xl`}>
                <Navbar/>
                {children}
            </Container>
        </>
    )
}
