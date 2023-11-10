import './globals.css'
import {Providers} from "@/app/providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Модуль "Админ-Панель"',
  description: 'Для $$$KURS4CH$$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  )
}
