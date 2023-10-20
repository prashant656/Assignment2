import { MongoClient } from "mongodb";

// Add your MongoDb connection string below
const connectionString = "mongodb+srv://prashant:admin@cluster0.3ojbz8k.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("connected to DB");
} catch(e) {
  console.error(e);
}

let db = conn.db("Marketplace");

export default db;