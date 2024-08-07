import { createHono, createServer } from "./server";

const app = createHono();
const server = createServer(app);
