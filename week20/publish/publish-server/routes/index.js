var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log("=============");
//   res.render('index', { title: 'Express' });
    console.log(req.body);
    fs.writeFileSync("../server/public/" + req.query.filename, req.body.msg);
    res.send('Hello World!');
});



module.exports = router;
