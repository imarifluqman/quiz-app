# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

INFINITY CODE Quiz App — a Next.js educational platform where users register, take quizzes on web development topics (HTML, CSS, JavaScript, TypeScript), view course videos from YouTube playlists, and download PDF certificates with their results.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint with Next.js core-web-vitals)

No test framework is configured.

## Architecture

**Next.js 14 App Router** with `src/app/` directory structure. All page components are client-side (`"use client"`). JavaScript (JSX), not TypeScript. Path alias: `@/*` maps to `./src/*`.

### User Flow

Registration (`/register`) → Course Selection (`/course`) → Quiz (`/questions`) → Results + Certificate (`/result`)

Each step uses localStorage as the sole data store. Route guards in `useEffect` redirect users who haven't completed prior steps.

### Routes

| Route | Purpose |
|---|---|
| `/` | Landing page (hero carousel, course cards, testimonials) |
| `/register` | Formik + Yup registration form |
| `/course` | Course selection (reads quiz.json keys) |
| `/questions` | MCQ quiz with scoring |
| `/result` | Score display + jsPDF certificate download |
| `/[courseVideos]?playlistId=XXX` | YouTube playlist video browser |

### Key Libraries

- **Formik + Yup** — form state and validation (schemas in `src/app/components/schemas/index.js`)
- **Swiper** — hero image carousel
- **jsPDF** — certificate PDF generation using a base64 background image (`src/app/components/base64.js`)
- **YouTube Data API v3** — fetches playlist videos in dynamic `[courseVideos]` route

### Data

- `src/app/components/quiz.json` — static quiz questions per topic
- `src/app/components/courseData.jsx` — course metadata with YouTube playlist IDs
- No backend or database; `db.json` exists for json-server but is unused
- All user state lives in localStorage

## Deployment

GitHub Actions workflow (`.github/workflows/nextjs.yml`) builds and deploys to GitHub Pages on push to `main`.
