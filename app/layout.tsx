import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Attention Health™ — Measure. Understand. Improve.',
  description:
    "India's most advanced Attention Health Assessment. Get deep insights into your focus, executive function, and mental energy — and a personalized plan to improve.",
  keywords: ['attention health', 'ADHD assessment', 'focus', 'cognitive performance', 'executive function'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  )
}
