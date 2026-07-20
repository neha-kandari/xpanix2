import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB || "xpanix";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Add it to .env.local (see .env.example)."
    );
  }
  return new MongoClient(uri).connect();
}

let prodClientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  // Reuse the connection across HMR reloads in dev, and across invocations in prod.
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise();
    }
    return global._mongoClientPromise;
  }
  if (!prodClientPromise) {
    prodClientPromise = createClientPromise();
  }
  return prodClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}
