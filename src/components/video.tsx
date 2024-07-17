"use client";

import * as React from "react";

export function Video({
  poster,
  source,
}: {
  poster?: string;
  source?: string;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const vidRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div className="relative ">
      <video
        poster={poster}
        ref={vidRef}
        loop
        playsInline
        className="rounded-xl border shadow-sm w-full  "
      >
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="w-full h-full flex items-center justify-center absolute top-0 left-0 cursor-pointer"
        aria-label={isPlaying ? "Pause video" : "Play video"}
        onClick={() => {
          setIsPlaying((p) => !p);
          if (vidRef.current?.paused) {
            vidRef.current?.play();
          } else {
            vidRef.current?.pause();
          }
        }}
      >
        {!isPlaying && (
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
        )}
      </div>
    </div>
  );
}
