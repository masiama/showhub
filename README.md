# ShowHub

ShowHub is a Vue 3 application built for the TVMaze frontend assignment. It presents TV shows grouped by genre, sorted by rating, with a searchable dashboard and a dedicated details page for each show.

## Tech stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Tailwind CSS
- Zod
- Vitest

## Architecture decisions

### TVMaze data flow

- Data is fetched from the TVMaze show index endpoint.
- API responses are validated with Zod before the app uses them.
- Shared formatting and collection logic lives in `src/utils`.

### Routing

- `/` shows the dashboard
- `/shows/:id` shows details for a selected TV show

## Features implemented

- list TV shows by genre
- sort shows within each genre by rating
- search shows by name
- show details page
- responsive layout for mobile and desktop
- unit tests for shared utils

## Requirements

- Node.js 20.19+ or 22.12+
- pnpm (Chosen for security and space efficiency)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

The dev server starts on the default Vite port unless that port is already in use.
Add `--open` option to automatically open app in browser.
