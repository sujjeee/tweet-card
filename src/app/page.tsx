import { TweetCard } from "@/components/tweet-card"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function Page() {
  const tweets = [
    "1699772701089689844",
    "1783170597121618123",
    "1783170635650539666",
    "1811025968494170544",
    "1812647287790703042",
    "1699772701089689844",
    "1783170597121618123",
    "1783170635650539666",
    "1811025968494170544",
    "1812647287790703042",
  ]

  return (
    <>
      <section className="p-2.5 pt-10 sm:container sm:max-w-screen-lg flex items-center justify-center">
        <div className="list-none space-y-2 py-8 sm:block sm:columns-2 sm:gap-2 lg:columns-3 pb-28">
          {tweets.map((id, idx) => (
            <React.Suspense
              key={idx}
              fallback={<Skeleton className="size-[500px]" />}
            >
              <TweetCard tweetId={id} />
            </React.Suspense>
          ))}
        </div>
      </section>
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-red-50"
        style={{
          background: "linear-gradient(to bottom,transparent, #fff 10%)",
          maskImage: "linear-gradient(to top, #fff 30%,transparent)",
          backdropFilter: "blur(1px)",
        }}
      />
    </>
  )
}
