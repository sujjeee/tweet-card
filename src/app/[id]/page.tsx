import { TweetCard } from "@/components/tweet-card"
import React from "react"

interface PageProps {
  params: { [key: string]: string | undefined }
}

export default function TweetPage({ params }: PageProps) {
  const tweetId = (params.id as string) || "1812874506438140090"

  return (
    <>
      <section className=" flex min-h-screen flex-col absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <section className="flex-1 container fixed left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-0 ">
          <TweetCard tweetId={tweetId} />
        </section>
      </section>
    </>
  )
}
