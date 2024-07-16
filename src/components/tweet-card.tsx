import * as React from "react"
import { getTweet, Tweet } from "react-tweet/api"
import { enrichTweet } from "react-tweet"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

interface TweetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tweetId: string
  metrics?: boolean
  media?: boolean
  timestamp?: boolean
  scale?: number
}

export async function TweetCard(props: TweetCardProps) {
  const {
    tweetId,
    metrics = true,
    media = true,
    timestamp = true,
    scale = 0.7,
    className,
  } = props

  const tweet = await getTweet(tweetId)
  if (!tweet) return null

  return (
    <div
      className={cn(
        "max-w-[500px] h-fit size-full rounded-lg border bg-card relative overflow-hidden hover:scale-[1.01] transform transition duration-200 cursor-pointer",
        className,
      )}
    >
      <div className="shrink-0 leading-[normal]" style={{ scale: scale }}>
        {/* user information */}
        <div className="flex items-center  gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tweet.user.profile_image_url_https}
            alt="User avatar"
            className="size-[45px] rounded-full"
          />
          <div className="flex flex-col overflow-hidden text-[15px]">
            <div className=" flex font-bold  items-center">
              <div className="overflow-hidden whitespace-nowrap truncate">
                {tweet.user.name}
              </div>
              {tweet.user.is_blue_verified && (
                <Icons.verified className="w-4 ml-0.5 text-[rgb(27,149,224)] fill-[currentcolor] shrink-0" />
              )}
            </div>
            <div className="text-muted-foreground ">
              @{tweet.user.screen_name}
            </div>
          </div>
        </div>

        {/* tweet content */}
        <div className="leading-[122%] whitespace-pre-wrap break-words mt-3">
          {enrichTweet(tweet as Tweet).entities.map((entity, idx) => {
            switch (entity.type) {
              case "url":
              case "symbol":
              case "hashtag":
              case "mention":
                return (
                  <a
                    key={idx}
                    href={entity.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1b95e0]"
                  >
                    <span>{entity.text}</span>
                  </a>
                )
              case "text":
                return (
                  <span
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: entity.text }}
                  />
                )
            }
          })}
        </div>

        {/* media */}
        {media && tweet.mediaDetails && (
          <div className="relative overflow-hidden mt-3 rounded-xl  ">
            {/* if tweet contains video */}
            {tweet.video && (
              <div className="relative ">
                <video
                  poster={tweet.video.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl border shadow-sm w-full  "
                >
                  <source
                    src={tweet?.video?.variants[0]?.src}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                  <div className="size-[80px] rounded-full bg-[#1d9bf0] flex items-center justify-center border-4 border-white">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-1/2 fill-white ml-2"
                    >
                      <g>
                        <path d="M21 12L4 2v20l17-10z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* if tweet contains photos */}
            {tweet.photos && tweet.photos.length > 0 && (
              <>
                {/* Render grid for multiple photos */}
                {tweet.photos.length > 1 ? (
                  <div className="grid grid-cols-[1fr_1fr] overflow-hidden aspect-[1.77_/_1] gap-[1.6px]">
                    {tweet.photos.map((photo, idx) => (
                      <div
                        className={cn(
                          "overflow-hidden",
                          tweet.photos &&
                            tweet.photos.length > 2 &&
                            idx === 0 &&
                            "row-span-2",
                        )}
                        key={photo.url}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.url}
                          title={`Photo by ${tweet.user.name}`}
                          alt={tweet.text}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Render single photo case
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tweet.photos[0]?.url}
                      title={`Photo by ${tweet.user.name}`}
                      alt={tweet.text}
                      className="w-full h-full object-cover object-center rounded-xl border"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* timestemp */}
        {timestamp && (
          <div className="mt-4">
            <span className="text-muted-foreground text-sm">
              {formatDate(tweet?.created_at!)}
            </span>
          </div>
        )}

        {/* metrics */}
        {metrics && (
          <div className="flex items-center gap-4 text-sm w-full mt-4 ">
            <span className=" flex items-center gap-1 whitespace-nowrap">
              <strong>{formatCount(tweet.favorite_count)}</strong>
              <span className="text-muted-foreground text-sm">Likes</span>
            </span>
            <span className=" flex items-center gap-1 whitespace-nowrap">
              <strong>{formatCount(tweet.conversation_count)}</strong>
              <span className="text-muted-foreground text-sm">Replies</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(dateString: string) {
  // format time
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }

  // format date
  const time = date.toLocaleTimeString("en-US", options)
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  // return
  const formattedDate = date.toLocaleDateString("en-US", dateOptions)
  return `${time} · ${formattedDate}`
}

function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString()
  } else if (count >= 1000 && count < 1000000) {
    return (count / 1000).toFixed(1) + "K"
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M"
  }
  return count.toString()
}
