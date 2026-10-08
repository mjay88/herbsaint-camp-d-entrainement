import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";

import * as schema from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  try {
    console.log("Resetting userProgress in database");

   
    await db.delete(schema.userProgress);
  
   console.log("Finished resetting userProgress in database");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
