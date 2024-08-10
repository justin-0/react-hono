# Server

- [x] Server file, hono instance and create server
- [x] - base api path
- [x] expenses route - get expenses, create expense, update expense, delete expense
- [x] zod validator for post
- [x] create zod schema, create type from schema with infer
- [x] Hono RPC for typesafety
- [] TODO: Static serve frontend build files - root and fallback
- [x] Create middleware to set a user var

## After hardcoded values work as expected when querying server

- [x] Install ORM of choice
- [x] Select database service
- [x] Create tables schema, consider an index if using postgres

- Database returning an array but it will only be a single value? Chain then and select zero index from result value

## Server - Auth

- [x] Sign up, hash password (bcryptjs) and save user to mongodb
- [x] Use JWT for sessions set on cookies
- [] Update middleware to check for jwt cookie and set user variable once token has been verified to get id, as well as during sign-in

# Client

- [x] Form to create expense - shadcn? tanstack form?
- [] TODO: Table to show all expenses, user can filter expenses
- [] TODO: Tanstack Router authenticated routes
- [] TODO: Tanstack query to interact with api
- [x] Link up RPC with client
- [x] Vite proxy to avoid cors issues
- [x] Tailwind css for styling
- [] TODO: Bar charts for analytics
- [] TODO: React query for server state
- [] TODO: Zustand for client state
