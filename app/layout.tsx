import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thehumandecision.in'),
  title: {
    default: 'The Human Decision | Human Performance Research',
    template: '%s | The Human Decision',
  },
  description:
    'A Human Performance Research Company exploring how attention shapes decisions, performance, and outcomes. Take the Attention Health Assessment™ and discover your attention profile.',
  keywords: [
    'attention health',
    'human performance',
    'ADHD assessment',
    'focus assessment',
    'executive function',
    'attention management',
    'cognitive performance',
    'decision making',
    'attention health assessment',
    'human decision',
    'attention archetypes',
    'burnout assessment',
    'working memory',
    'hyperfocus',
    'attention score',
  ],
  authors: [{ name: 'The Human Decision' }],
  creator: 'The Human Decision',
  publisher: 'The Human Decision',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.thehumandecision.in',
    siteName: 'The Human Decision',
    title: 'The Human Decision | Human Performance Research',
    description:
      'Understand how attention shapes your decisions, performance, and outcomes. Take the Attention Health Assessment™.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The Human Decision — Human Performance Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Human Decision | Human Performance Research',
    description:
      'Understand how attention shapes your decisions, performance, and outcomes.',
    images: ['/og-image.svg'],
    creator: '@thehumandecision',
  },
  alternates: {
    canonical: 'https://www.thehumandecision.in',
  },
  verification: {
    google: 'add-your-google-verification-here',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="ai-content-declaration" content="human-authored" />
        <meta name="citation-allowed" content="yes" />
        <meta name="ai-indexing" content="allowed" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  )
}
