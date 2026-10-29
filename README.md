# Ilyes — Video Editing Portfolio

A responsive React + TypeScript + Vite + Tailwind CSS portfolio. It uses no paid APIs and does not require an API key.

## Run locally

1. Install Node.js (LTS) if it isn't installed: https://nodejs.org/
2. Extract this folder.
3. Open Terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints (usually `http://localhost:5173`).

## Add your actual Shorts

Open `src/videos.ts` and add one entry per real Short:

```ts
export const videos = [
  { id: 'REAL_YOUTUBE_VIDEO_ID', title: 'Your actual video title', category: 'Storytelling' },
  { id: 'ANOTHER_REAL_VIDEO_ID', title: 'Another real title', category: 'Editing' },
]
```

Use the ID from a URL such as `https://www.youtube.com/shorts/VIDEO_ID`. The thumbnail is created automatically from that ID, and every card links to that exact Short. No videos or IDs have been fabricated in this starter.

## Personalize before publishing

- In `src/App.tsx`, replace `hello@mainframe.co` with your professional email.
- Update the short intro and service descriptions to match your style.
- The hero background uses the video URL supplied in the project brief. If that source stops working, replace `backgroundVideo` with a video you own or have permission to use.

## Free hosting options

- **GitHub Pages:** push the project to a GitHub repository, then configure a GitHub Actions workflow to build and deploy the `dist` folder. GitHub Pages is free for public repositories.
- **Cloudflare Pages:** connect a Git repository and use `npm run build` with `dist` as the output directory; check the provider's current free-plan terms before publishing.

Font stylesheet URLs are externally hosted and may be subject to their provider's availability/terms. System font fallbacks are included.
