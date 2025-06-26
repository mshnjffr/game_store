# Agent Development Guide

## Commands
- **Dev:** `npm run dev` (starts both frontend/backend concurrently)
- **Build:** `npm run build` (frontend), `npm run build:backend` (backend)
- **Test:** `npm run test` (backend), `npm run test:frontend` (frontend)
- **Single test:** `cd backend && npm test -- --testNamePattern="test_name"` or `cd frontend && npm test -- --testNamePattern="test_name"`
- **Lint:** `npm run lint` (frontend), `npm run lint:backend` (backend)
- **Type check:** `cd frontend && npm run type-check`
- **DB commands:** `npm run db:setup`, `npm run db:seed`, `npm run db:reset`, `npm run db:studio`

## Architecture
Full-stack game e-commerce app with Next.js 15 (TypeScript) frontend, Express.js (JavaScript) backend, and PostgreSQL with Prisma ORM. Two main directories: `frontend/`, `backend/`.

## Code Style
- **Frontend:** TypeScript with strict mode, Next.js App Router, Tailwind CSS + shadcn/ui components, React Hook Form + Zod validation
- **Backend:** JavaScript ES6+, Express.js with Prisma ORM, session-based auth with bcrypt
- **Imports:** Use `@/` prefix for frontend imports (configured in tsconfig.json)
- **Database:** Prisma schema in `backend/prisma/schema.prisma`, migrations with `npx prisma migrate dev`
- **Error handling:** Server-side validation with Joi, client-side with Zod
- **API:** RESTful endpoints under `/api/` with Express routes in `backend/src/routes/`

## Key Files
- Main configs: `package.json` (root), `frontend/next.config.mjs`, `backend/prisma/schema.prisma`
- Environment: `.env` files in root, frontend, and backend directories
- Database seeding: `backend/prisma/seed.js`
