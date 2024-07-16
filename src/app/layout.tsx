import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SvgText } from "@/components/svg-text"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://tweetcard.vercel.app"),
  title: "Minimal Tweet Card",
  description: "Minimal Tweet Card built with Tailwind CSS",
  creator: "sujjeee",
  keywords: [
    "tweet ui",
    "tweet card",
    "tweet card ui",
    "tailwindcss tweet card",
    "sujjeee",
    "minimal tweet card",
    "tailwind css card",
  ],
  openGraph: {
    title: "Minimal Tweet Card built with Tailwind CSS",
    type: "website",
    url: "https://tweetcard.vercel.app/",
    images: [
      {
        url: "https://tweetcard.vercel.app/opengraph-image.png",
        alt: "Minimal Tweet Card built with Tailwind CSS",
      },
    ],
  },
  twitter: {
    site: "@sujjeee",
    images: [
      {
        url: "https://tweetcard.vercel.app/opengraph-image.png",
        alt: "Minimal Tweet Card built with Tailwind CSS",
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
