import * as React from "react";
import { getTweet, Tweet } from "react-tweet/api";
import { enrichTweet } from "react-tweet";
import { cn } from "@/lib/utils";
import { Video } from "./video";

interface TweetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tweetId: string;
  metrics?: boolean;
  media?: boolean;
  timestamp?: boolean;
  scale?: number;
}

export async function TweetCard(props: TweetCardProps) {
  const {
    tweetId,
    metrics = true,
    media = true,
    timestamp = true,
    scale = 0.7,
    className,
  } = props;

  const tweet = await getTweet(tweetId);

  if (!tweet) return null;

  return (
    <div
      className={cn(
        "max-w-[500px] h-fit size-full rounded-lg border bg-card relative overflow-hidden hover:scale-[1.01] transform transition duration-200 cursor-pointer",
        className
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
              {(tweet.user.is_blue_verified || tweet.user.verified) && (
                <VerifiedBadge className="w-4 ml-0.5 text-[rgb(27,149,224)] fill-[currentcolor] shrink-0" />
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
                );
              case "text":
                return (
                  <span
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: entity.text }}
                  />
                );
            }
          })}
        </div>

        {/* media */}
        {media && tweet.mediaDetails && (
          <div className="relative overflow-hidden mt-3 rounded-xl  ">
            {/* if tweet contains video */}
            {tweet.video && (
              <Video
                poster={tweet.video.poster}
                source={tweet.video.variants[2]?.src}
              />
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
                            "row-span-2"
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
  );
}

function formatDate(dateString: string) {
  // format time
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // format date
  const time = date.toLocaleTimeString("en-US", options);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // return
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  return `${time} · ${formattedDate}`;
}

function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count >= 1000 && count < 1000000) {
    return (count / 1000).toFixed(1) + "K";
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  return count.toString();
}

function VerifiedBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="Verified account"
      role="img"
      {...props}
    >
      <g>
        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
      </g>
    </svg>
  );
}
