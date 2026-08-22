import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Jett.io - Engineering Leadership in the Age of AI",
  description: "Signal Over Noise: Practical engineering leadership insights for the AI era",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${sourceSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
