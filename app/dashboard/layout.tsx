const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Модуль "$$$ADM1NKA$$$',
    description: 'Для $$$KURS4CH$$$',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <>
            {children}
        </>
    )
}
