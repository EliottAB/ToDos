import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToDos',
  description: 'Stay organized by creating simples To Dos with ToDos !',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}