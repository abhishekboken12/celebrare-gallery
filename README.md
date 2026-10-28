# Celebrare Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS as part of the Celebrare Frontend React Internship pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Loading and error states.
- Responsive grid: 1 column on mobile, 2 on tablet, and 4 on desktop.
- Real-time, case-insensitive author search.
- Favourite photos managed using `useReducer`.
- Favourites persisted using `localStorage`.
- Custom `useFetchPhotos` hook.
- Performance hooks: `useCallback` and `useMemo`.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Picsum Photos API

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## API

https://picsum.photos/v2/list?limit=30
