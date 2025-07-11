import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

console.log("Connecting to the database...", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export { db };
