'use strict';
var express = require('express');
var router = express.Router();

var URL = require('url');
var User = require('./model');

var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  let obj = {
    name : "Tom",
    age : 12,
    fruits : ['apple', 'orange']
  }

  res.send(JSON.stringify(obj, null, 2));
});

function readFile(fileName, callback){
  fs.access(fileName, err => {
    if(err){
      console.log('error when reading file ' +fileName + " error is: " + err);
      callback(err);
      return;
    }

    var data = '';
    var readStream = fs.createReadStream(fileName);
    readStream.setEncoding('UTF8')

    readStream.on('data', chunk => {
      data += chunk; 
      console.log('get a chunk: ' + chunk)
    })

    readStream.on('end', ()=> {
      console.log('end');
      
      callback(null, data);//only called the CB here and on error
    })

    readStream.on('error', err => {
      console.log('get an error: ' + err)
      callback(err);
    })

  })
}

router.get('/getUserInfo', (req, res, next) => {
  var user = new User();
  var params = URL.parse(req.url, true).query;

  var fileName = 'data/';
  console.log('param', params);
  if(params.id === '1'){
    fileName += 'Tom.json';
  } else {
    fileName += 'Jerry.json';
  }

  readFile(fileName, function(e, data){
    if(e){
      console.log('error calling the readFile: ' + e);
    }else{
      console.log('The result of calling the readFile: ' + data);
      user = JSON.parse(data);
      res.json(user);  //from Express 3.x
    }
  })

  //old way. write the response by self -- including head and body
  //res.writeHead(200, {"Content-Type": "application/json"});
  //res.write(user);
  //res.end();
  
  //res.end(JSON.stringify(user))


})

module.exports = router;
