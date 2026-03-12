import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'HotelBot — Intelligent Hospitality for Luxury Properties',
  description: 'AI-powered guest experience platform for premium hotels and villas. 24/7 multilingual service via WhatsApp.',
  openGraph: {
    title: 'HotelBot — Intelligent Hospitality for Luxury Properties',
    description: 'The guest experience platform that never sleeps. 5 AI agents working 24/7 for your property.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="grain">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
