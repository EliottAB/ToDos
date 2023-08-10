import './globals.css'
import type { Metadata } from 'next'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { UserContextProvider } from './context/userContext';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'ToDos',
  description: 'Stay organized by creating simples To Dos with ToDos !',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
      <UserContextProvider>
        {children}
      </UserContextProvider>
      </body>
    </html>
  )
}