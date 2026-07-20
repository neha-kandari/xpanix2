import { getDb } from "@/lib/mongodb";
import { Binary, ObjectId } from "mongodb";

const COLLECTION = "images";

type StoredImage = {
  _id: ObjectId;
  data: Binary;
  contentType: string;
  createdAt: number;
};

async function getCollection() {
  const db = await getDb();
  return db.collection<StoredImage>(COLLECTION);
}

export async function saveImage(buffer: Buffer, contentType: string): Promise<string> {
  const collection = await getCollection();
  const _id = new ObjectId();
  await collection.insertOne({ _id, data: new Binary(buffer), contentType, createdAt: Date.now() });
  return _id.toHexString();
}

export async function getImage(id: string): Promise<{ data: Buffer; contentType: string } | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getCollection();
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return { data: Buffer.from(doc.data.buffer), contentType: doc.contentType };
}
