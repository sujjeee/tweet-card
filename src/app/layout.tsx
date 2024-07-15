import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { SiteFooter } from "@/components/site-footer"
import SvgText from "@/components/svg-text"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beautiful Tweet Card",
  description: "Beautiful tweet card built with Tailwind CSS",
  creator: "sujjeee",
  keywords: [
    "tweet ui",
    "tweet card",
    "tweet card ui",
    "tailwindcss tweet card",
    "sujjeee",
    "tailwind css card",
  ],
  openGraph: {
    title: "Beautiful tweet card built with Tailwind CSS",
    type: "website",
    url: "https://tweets-card.vercel.app/",
    images: [
      {
        url: "https://tweets-card.vercel.app/opengraph-image.jpg",
        alt: "Explore People's First Tweets.",
      },
    ],
  },
  twitter: {
    site: "@sujjeee",
    images: [
      {
        url: "https://tweets-card.vercel.app/opengraph-image.jpg",
        alt: "Beautiful tweet card built with Tailwind CSS",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed left-60 top-0 ">
          <SvgText />
        </div>
        <div className="fixed left-0 top-0 -z-10  h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
