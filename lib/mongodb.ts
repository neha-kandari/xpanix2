import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB || "xpanix";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  // Vercel's MongoDB Atlas integration names its auto-generated variable
  // MONGODB_URI_MONGODB_URI instead of MONGODB_URI. Accept either so the
  // connection keeps working if the integration re-syncs that variable.
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Add it to .env.local (see .env.example)."
    );
  }
  // family: 4 forces IPv4, which avoids a known TLS handshake failure
  // ("tlsv1 alert internal error" / SSL alert 80) between Atlas and
  // serverless platforms like Vercel when the connection resolves over IPv6.
  return new MongoClient(uri, { family: 4 }).connect();
}

let prodClientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  // Reuse the connection across HMR reloads in dev, and across invocations in prod.
  // If a connection attempt fails, clear the cache so the next call retries
  // fresh instead of returning the same rejected promise forever.
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise().catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
    }
    return global._mongoClientPromise;
  }
  if (!prodClientPromise) {
    prodClientPromise = createClientPromise().catch((err) => {
      prodClientPromise = undefined;
      throw err;
    });
  }
  return prodClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}
