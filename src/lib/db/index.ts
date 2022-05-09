import type { IDatabase } from "$lib/types";
import { MongoClient } from "mongodb";
import { MongoDB } from "./mongodb";
import { test_database } from "./test_database";

import { env } from '$lib/env';

const uri = env.MONGODB_URI;

if (!uri) {
  throw new Error('Could not find URI');
}

// export const db: IDatabase = test_database;
export const db: IDatabase = new MongoDB(new MongoClient(uri).connect());
