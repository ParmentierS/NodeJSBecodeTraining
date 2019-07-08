const http = require('http');
const fs = require('fs');
const url = require('url');
let resSave=null;
let reqSave=null;
//callback is used only when we load the page
const server = http.createServer(async (req, res) => 
{
    res.statusCode = 200;
    let dataSave=null
    let dataSave2=null;
    await fs.readFile('./views/index.html', 'utf-8', (err, data) => {
        if (err) throw err
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        //https://flaviocopes.com/http-request-headers/
        dataSave=data;
        const query = url.parse(req.url, true).query;
        data = data.replace("{{name}}", query.name)
        data = data.replace("{{age}}", query.age)
        data = data.replace("{{sex}}", query.sex)
        data = data.replace("{{city}}", query.city)

        dataSave2=data;
        console.log("test1",dataSave);
        console.log("test2",dataSave2);
        res.end(data);
    }) 

    console.log("test3",dataSave); //is null take care of it
    console.log("test4",dataSave2);
    /*console.log("test req");
    console.log(res);
    console.log("test res");
    console.log(req);*/
    /*response.end([data][, encoding][, callback])
    data <string> | <Buffer>
    encoding <string> By default the encoding is 'utf8'. 
    callback <Function>
    Returns: <this>
This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
If data is specified, it is similar in effect to calling response.write(data, encoding) followed by response.end(callback).
If callback is specified, it will be called when the response stream is finished.*/ 
});

/*An IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data.

It implements the Readable Stream interface, as well as the following additional events, methods, and properties.*/ 
const port = 3000;
//initialize server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`J'ecris des choses`);
});
/*
    server.listen(handle[, backlog][, callback])
    server.listen(options[, callback])
    server.listen(path[, backlog][, callback]) for IPC servers
    server.listen([port[, host[, backlog]]][, callback]) for TCP servers
*/ 


/*const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST'
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        'The connection was terminated while the message was still being sent');
  });
});
*/ 

/*response and request object
console.log("test res");
*/