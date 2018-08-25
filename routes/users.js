'use strict';
var express = require('express');
var router = express.Router();

var URL = require('url');
var User = require('./model');

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

router.get('/getUserInfo', (req, res, next) => {
  var user = new User();
  var params = URL.parse(req.url, true).query;

  console.log('param', params);
  if(params.id === '1'){
    user.name = 'Tom'
    user.age = '11'
    user.city = 'Toronto'
  } else {
    user.name = 'Jerry'
    user.age = '9'
    user.city = 'Oakville'
  }

  //old way. write the response by self -- including head and body
  //res.writeHead(200, {"Content-Type": "application/json"});
  //res.write(user);
  //res.end();
  
  //res.end(JSON.stringify(user))
  res.json(user);  //from Express 3.x

})

module.exports = router;
