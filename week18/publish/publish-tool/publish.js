const http = require("http");
const querystring = require("querystring");

const postData = querystring.stringify({
    'msg': 'Hello World!sssss'
  });
  

const options = {
    host: "localhost",
    port: "8081",
    path: "/?filename=x.html",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    // res.on('end', () => {
    //   console.log('No more data in response.');
    // });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();