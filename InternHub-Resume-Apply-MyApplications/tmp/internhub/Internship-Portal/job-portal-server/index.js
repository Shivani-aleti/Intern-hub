const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.p2t0orx.mongodb.net`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    const jobsCollection = db.collection("demoJob");

    // Example of posting a job
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    // Add company name to the job details
    body.companyName = req.body.companyName;
    body.createdAt = new Date();
    const result = await jobsCollection.insertOne(body);
    if (result.insertedId) {
      return res.status(200).json({ acknowledged: true });
    } else {
      return res.status(404).json({
        message: "can not insert! try again later",
        acknowledged: false
      });
    }
  } catch (error) {
    console.error("Error occurred while inserting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollection.find({}).toArray();
    res.json(jobs);
  } catch (error) {
    console.error("Error occurred while fetching all jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

    app.get("/myJobs/:email", async (req, res) => {
      const jobs = await jobsCollection.find({ postedBy: req.params.email }).toArray();
      res.json(jobs);
    });

    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(filter);
      res.json(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // This will ensure that the client closes if an error occurs
    // await client.close();
  }
}
run().catch((error) => console.error("MongoDB connection error:", error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
