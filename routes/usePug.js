'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {//Added by foxfoot
        res.render('index', { title: 'Hey', message: 'Hello there! this is pug/jade' })  //render the index.pug file to html
        //next();
    }
)

router.get('/test', function(req, res, next){
    // get the URL query  http://localhost:3000/testpug/test?youAreUsingPug=false
    let youAreUsingPug = req.query.youAreUsingPug === 'true';   
    console.log('youAreUsingPug is ' + youAreUsingPug);

    res.render('test', {
        pageTitle : 'test a new pug template',
        youAreUsingPug : youAreUsingPug//,
        //foo : true,
        //bar : (a, b)=>a+b
    })
})

router.get('/table',  function(req, res, next){
    var rows = [
        {
            firstName : 'Tom',
            lastName : 'Cat'
        },
        {
            firstName : 'Jerry',
            lastName : 'Mouse'
        }
    ];

    res.render('table', 
        {
            title : 'mytable',
            rows : rows
        },
        function callback(e, html){
            if(e){
                console.log("error: " + e);
            } else {
                //write the response by self -- including head and body
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(html);
                res.end();
            }
        }
    );
})



router.get('/tableExample',  function(req, res, next){
    res.render('table-example');
})

module.exports = router;