import type { IDatabase } from "$lib/types";
import { MongoClient } from "mongodb";
import { MongoDB } from "./mongodb";
import 'dotenv/config';
import { test_database } from "./test_database";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Could not find URI');
}

export const db: IDatabase = test_database;
// export const db: IDatabase = new MongoDB(new MongoClient(uri).connect());
