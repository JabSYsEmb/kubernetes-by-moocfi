const fastify = require('fastify')({ logger: true });
const path    = require('path');
require('dotenv').config();

fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

fastify.get('/:file', function (req, reply) {
  reply.sendFile(`${req.params.file}`) // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.get('/', function (req, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3000 }, function (err, addr) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server started in port ${addr.split(':').pop()}`);
})
