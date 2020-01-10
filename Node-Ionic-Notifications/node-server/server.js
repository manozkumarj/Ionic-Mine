'use strict'

const express = require('express');
const config = require("./config/database");
const app = express(),
    request = require('request'),
    mongo = require('mongodb'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/inodenotify';
const dbName = 'notifier_db';

app.post('/store', (req, res) => {
    console.log("From /store -> Token -> ");
    console.log(req.body);

    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        else {
            let db = client.db(dbName);
            db.collection('tokens').insertOne(req.body, (err, body) => {
                if (err) throw err;
                res.status(200).send('');
            })
        }
        client.close();
    });
});

app.get('/test', (req, res) => {

    MongoClient.connect(url, (err, client) => {
        console.log("WOW....! Connected to mongodb");
        client.close();
    });
    res.json('Test is working...');
});

var FCM = require('fcm-node');
//put your server key here
var serverKey = 'AAAAGcG0JCE:APA91bHBgiCNztaX-B37c7LpyYJpRiqXrXhpnm1C1_QH99Z9Gkqn1bb2OKFwfzrEBE5p-r-kFP7tbsCmUhRvSLcgTaRSbAXaC-4mrnvwSjiY7foToz2R8BQJjkVIuojFRutlvgiiS64L';
var fcm = new FCM(serverKey);

app.get('/', (req, res) => {
    res.send('Notifications Test');
});

app.get('/send', function (req, res) {

    var token_array = [];

    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        else {
            let db = client.db(dbName);
            db.collection('tokens').find().toArray((err, docs) => {
                if (err) throw err;
                for (let i = 0; i < docs.length; i++) {
                    token_array.push(docs[i]);
                }
            });
        }
        client.close();
    });

    for (let i = 0; i < token_array.length; i++) {
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: token_array[i].token,
            collapse_key: 'pinkk',

            notification: {
                title: 'Title of your push notification',
                body: 'Body of your push notification'
            },

            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }

    res.send('send msg');
});


app.listen(6789, () => console.log('Notifier listening on port 6789!'));