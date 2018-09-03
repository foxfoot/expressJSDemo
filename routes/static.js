'use strict'
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
    var fileName = path.join(__dirname, '..', 'public', 'test-get-web.html');
    console.log('fileName=' + fileName);
    res.sendFile(fileName);
})

router.get('/process_get', function(req, res){
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    console.log(response);
    res.json(response);

    //res.end(JSON.stringify(response));
})

router.get('/test-post', function(req, res){
    var fileName = path.join(__dirname, '..', 'public', 'test-post-web.html');
    console.log('fileName=' + fileName);
    res.sendFile(fileName);
})

router.post('/process_post',  function(req, res){
    console.log("POST body: " + JSON.stringify(req.body));
    res.json({
        got_first_name : req.body.first_name,
        got_last_name : req.body.last_name
    });
})

module.exports = router;