//import express from 'express';
//import {MongoClient, ObjectID} from 'mongodb';
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router(),
    url = "mongodb+srv://dbVane:n3mA3HZi3ZZAgn5@mycluster.bdc9h.mongodb.net/knot?retryWrites=true&w=majority";

let knot;

mongodb.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) throw err;
    knot = client.db(process.env.MONGO_DB_NAME);
    console.log(knot);
});

router.get('/:dashboardId', async (req, res) => {
    const {dashboardId} = req.params;

    if (!!knot) {
        const id = new mongodb.ObjectID(dashboardId);
        const dashboard = await knot.collection('__dashboards').findOne({_id: id});
        res.json(dashboard);
    } else {
        res.status(500).send('knot database not found!');
    }
});


module.exports = router;
