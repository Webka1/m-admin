import '../styles/globals.css'
import {Providers} from "@/app/providers";
import { Inter } from 'next/font/google'
import DarkThemeSwitch from "@/components/DarkThemeSwitcher";

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: process.env.ADMIN_NAME,
  description: 'Для $$$KURS4CH$$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  )
}
