# Server

- [x] Server file, hono instance and create server
- [x] - base api path
- [x] expenses route - get expenses, create expense, update expense, delete expense
- [x] zod validator for post
- [x] create zod schema, create type from schema with infer
- [x] Hono RPC for typesafety
- [] TODO: Static serve frontend build files - root and fallback
- [] TODO: Create middleware to set a user var

## After hardcoded values work as expected when querying server

- [] TODO: Install ORM of choice
- [] TODO: Select database service
- [] TODO: Create tables schema, consider an index if using postgres

- Database returning an array but it will only be a single value? Chain then and select zero index from result value

# Client

- [] TODO: Form to create expense - shadcn? tanstack form?
- [] TODO: Table to show all expenses, user can filter expenses
- [] TODO: Tanstack Router for file system routing - authenticated routes
- [] TODO: Tanstack query to interact with api
- [] TODO: Link up RPC with client
- [] TODO: Vite proxy to avoid cors issues
- [] TODO: Tailwind css for styling
- [] TODO: Bar charts for analytics
- [] TODO: React query as state manager or zustand?
