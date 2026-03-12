import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HotelBot — AI Concierge for Luxury Hospitality',
  description: 'Intelligent WhatsApp concierge for premium hotels and villas. 24/7 multilingual guest assistance powered by AI.',
  openGraph: {
    title: 'HotelBot — AI Concierge for Luxury Hospitality',
    description: 'The reception that never sleeps. WhatsApp AI for 5-star hotels and premium villas.',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
