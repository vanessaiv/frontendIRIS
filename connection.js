var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/knot');

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("analytic_declaraciones_brief", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});
