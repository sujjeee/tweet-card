<a href="https://tweetcard.vercel.app/" target="_blank">
  <img src="https://tweetcard.vercel.app/opengraph-image.png" alt="Minimal Tweet Card" />
</a>

Minimal Tweet Card built with [TailwindCSS](https://tailwindcss.com/).

## Props

Tweet card component accepts the following props:

- `tweetId` of the tweet, which can be obtained from the tweet url.
- `metrics` boolean to show tweet metrics. (Default is true).
- `media` boolean to show tweet media. (Default is true).
- `timestamp` boolean to show tweet timestamp. (Default is true).
- `scale` controls the scale of the tweet content within the card. (Default is 0.7).

## Usage

```jsx
import React from "react"

export const App = () => {
  return <TweetCard tweetId={tweetId} />
}
```
