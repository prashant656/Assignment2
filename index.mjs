import express from "express";
import cors from "cors";

import products from "./routes/products.mjs";

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api", products);

// start the Express server
app.listen(PORT, () => {
  console.log("application running on port 5050");
});
// Global error handling
app.use((err, _req, res, next) => {
  console.error(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

