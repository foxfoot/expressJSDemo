'use strict';
const express = require('express');
const router = express.Router();

const URL = require('url');
const User = require('./model');
const Joi = require('joi')

const fs = require('fs');

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

function readFile1(fileName, callback){
  fs.access(fileName, err => {
    if(err){
      console.error('error when reading file ' +fileName + " error is: " + err);
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
      console.error('get an error: ' + err)
      callback(err);
    })

  })
}

function readFile2(fileName, res){
  fs.access(fileName, err => {
    if(err){
      console.error('error when reading file ' +fileName + " error is: " + err);
      res.status(500);
      res.json({error : err})
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
      
      res.json(JSON.parse(data));
    })

    readStream.on('error', err => {
      console.error('get an error: ' + err)
      res.status(500);
      res.json({error : err})
    })

  })
}

router.get('/userInfo', (req, res, next) => {
  //use joi.js to verify the input
  const schema = Joi.object().keys({
    fileName: Joi.string().alphanum().min(3).max(30).required() //only accept fileName [3,30]
  });

  const {error} = Joi.validate(req.query, schema);
  if(error){
    res.status(400).send('Invalid parameter. Error: ' + error.details[0].message);
    return;
  }

  var user = new User();
  //var params = URL.parse(req.url, true).query;
  var params = req.query;
  var fileName = params.fileName || 'Tom';
  var fullFileName = 'data/' + fileName + '.json';
  console.log('param', fullFileName);

/*  readFile1(fullFileName, function(e, data){  //CB as argument
    if(e){
      console.error('error calling the readFile: ' + e);
      res.status(500);
      res.json({error : e})
    }else{
      console.log('The result of calling the readFile: ' + data);
      user = JSON.parse(data);
      res.json(user);  //from Express 3.x
    }
  })
*/
  readFile2(fullFileName, res);  // res as argument

  //old way. write the response by self -- including head and body
  //res.writeHead(200, {"Content-Type": "application/json"});
  //res.write(user);
  //res.end();
  
  //res.end(JSON.stringify(user))


})

router.post("/userInfo", function(req, res){
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(), //only accept fileName [3,30]
    age : Joi.number().min(0).max(150).required(),
    city : Joi.string().alphanum().min(1).optional()
  });

  const {error} = Joi.validate(req.body, schema);
  if(error){
    res.status(400).send("Invalid parameter: " + error.details[0].message);
  }

  const obj = {
    name : req.body.name,
    age : req.body.age,
    city : req.body.city || ""
  }
  res.json(obj);
})

module.exports = router;
