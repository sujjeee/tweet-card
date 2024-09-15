import React from "react"
import { TweetCard } from "@/components/tweet-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getTweet } from "react-tweet/api"

export default function Page() {
  const tweets = [
    "1812874506438140090",
    "1809352140147900447",
    "1812723542816878756",
    "1780667913386782877",
    "1812834653000323554",
    "1699097578548363266",
    "1810714237146214785",
    "1812887016503210271",
    "1831758150065922401",
    "1811260876697358554",
    "1779963510946144268",
    "1812885890382929956",
    "1812956468137902295",
  ]

  const tweetPromises = tweets.map((id) => getTweet(id))

  return (
    <>
      <section className="p-2.5 pt-10 sm:container sm:max-w-screen-lg flex items-center justify-center">
        <div className="list-none space-y-2 py-8 sm:block sm:columns-2 sm:gap-2 lg:columns-3 pb-28">
          {tweetPromises.map((promise, idx) => (
            <React.Suspense
              key={idx}
              fallback={<Skeleton className="size-[500px]" />}
            >
              <TweetCard tweetPromise={promise} />
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
