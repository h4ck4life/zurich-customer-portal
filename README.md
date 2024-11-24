Visit here to see the demo: https://zurich-cportal.netlify.app/

## Highlights:
- Next.js with Typescript + TailwindCSS
- Shadcn library for UI component
- App UI components are placed in `components` folder, outside of next.js main app dir to keep them not tighly mixed for easier swapping and better components reusability.
- Vitest for unit tests. Please note that I've only covered a few files for unit tests to demonstrate example. Please run, `npm run test` to see the result.
- There is also coverage report example, `npm run coverage`
- Using API route handlers to host business logics (filter list) and security tasks (email masking)
- Use middleware to intercept the incoming request and checking protected pages/routes

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


