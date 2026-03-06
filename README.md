# Imprint AI Support Agent

An AI-powered support chat agent built for [Imprint](https://imprintapp.com), the visual learning app. This is a fully functional demo that handles subscription management, billing questions, refund guidance, and account troubleshooting — all through a conversational interface powered by Claude.

**This project was built as an unsolicited demo for the Imprint team** to demonstrate how an AI support agent could work on their platform.

## Features

- Streaming chat responses via Claude (claude-sonnet-4-20250514)
- Built-in knowledge base covering cancellations, billing, refunds, and account access
- Starter question chips for common support scenarios
- Automatic escalation link to human support after extended conversations
- Mobile-responsive dark UI styled to match Imprint's brand

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic API (streaming)
- **Deployment:** Vercel-ready

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.local.example .env.local
# Edit .env.local and add your key

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard
4. Deploy

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com) |
