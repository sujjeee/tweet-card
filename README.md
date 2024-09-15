## Tweet Card component built with [React Tweet](https://react-tweet.vercel.app/) and [TailwindCSS](https://tailwindcss.com/).

<a href="https://tweetcard.vercel.app/" target="_blank">
  <img src="https://tweetcard.vercel.app/opengraph-image.png" alt="Minimal Tweet Card" />
</a>

## Props

Tweet card component accepts the following props:

- `tweetId` of the tweet, which can be obtained from the tweet url.
- `metrics` boolean to show tweet metrics. (Default is true).
- `media` boolean to show tweet media. (Default is true).
- `timestamp` boolean to show tweet timestamp. (Default is true).
- `scale` controls the scale of the tweet content within the card. (Default is 0.7).

## Usage

1. Install the `react-tweet` npm package.

2. Visit [this URL](https://github.com/sujjeee/tweet-card/blob/main/src/components/tweet-card.tsx) and copy the code.

   - If you are using `shadcn`, you are good to go. Otherwise, you need to add `tailwind-merge`. Check the code [here](https://github.com/sujjeee/tweet-card/blob/main/src/lib/utils.ts).

3. Paste the `<TweetCard>` component into your project:

   ```jsx
   import React from "react"
   import { TweetCard } from "./path-to-your-tweet-card-component"

   export const App = () => {
     const tweetId = "1234567890"
     return <TweetCard tweetId={tweetId} />
   }
   ```
