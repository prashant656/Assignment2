import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();




router.get("/", async (req, res) => {
    res.json({ message: "Welcome to DressStore Application" });
  });
router.get("/products", async (req, res) => {
    let collection =  db.collection("products");
    let results = await collection.find({})
      .limit(50)
      .toArray();
  
    res.send(results).status(200);
  });
// Get a single post
router.get("/products/:id", async (req, res) => {
    let collection = await db.collection("products");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });


// Add a new document to the collection
router.post("/products", async (req, res) => {
    let collection = await db.collection("products");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });


router.put("/products/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("products");
    const updates = req.body; // Update the document with the entire request body

    const result = await collection.updateOne(query, { $set: updates });

    if (result.matchedCount === 0) {
      res.status(404).json({ error: "User story not found" });
    } else {
      res.status(200).json({ message: "User story updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an entry
router.delete("/products/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("products");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send({ error: "Document not found" });
    } else {
      res.status(200).send({ message: "Document deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/products", async(req, res)=> {
    let collection = await db.collection("products");
    let results = await collection.deleteMany({});
    res.send(results).statusMessage("All products has been deleted").status(200);
});

router.get("/products", async (req, res) => {
    const collection = await db.collection("products");
    const query = {};
  
    // Check if a query parameter "name" is provided
    if (req.query.name && req.query.name.startsWith("kw")) {
      query.name = { $regex: `^kw`, $options: 'i' };
    }
  
    const result = await collection.find(query).toArray();
  
    if (result.length === 0) {
      res.status(404).send("No products found");
    } else {
      res.status(200).send(result);
    }
  });
  
  
  


export default router;
