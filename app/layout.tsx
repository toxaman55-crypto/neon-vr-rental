import React from 'react'
import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'NEONVR — VR events in Tallinn',
  description:
    'Birthdays, team events and free-roam virtual reality adventures in Tallinn.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'NEONVR — VR events in Tallinn',
    description:
      'Birthdays, team events and free-roam virtual reality adventures in Tallinn.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050711] text-white antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}