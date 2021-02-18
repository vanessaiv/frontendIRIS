const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
//mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
//const connection = mongoose.connection;
//connection.once('open', () => {
//  console.log('MongoDB connection established successfully!');
//});


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbVane:n3mA3HZi3ZZAgn5@mycluster.bdc9h.mongodb.net/knot?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const dashboardsRouter = require('./routes/dashboards');

app.use('/dashboards', dashboardsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
