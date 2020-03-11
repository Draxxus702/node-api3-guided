const express = require('express'); // importing a CommonJS module
const morgan = require('morgan')
const hubsRouter = require('./hubs/hubs-router.js');
const helmet = require('helmet')
const server = express();


//global middleware
server.use(morgan("short"))//third party, needs to be mpn installed
server.use(helmet())
server.use(express.json());
server.use(logger)
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

console.log(`req.name is:`, req.name)

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(function(req, res, next) {
  res.status(404).json({
    errorMessage: 'Oops sorry couldnt find the url you are looking for'
  })
})

function logger(req, res, next){
  //log information about the request to the console
const method = req.method
const endpoint = req.originalURL

console.log(`${method} to ${endpoint}`)

next()
}


module.exports = server;
