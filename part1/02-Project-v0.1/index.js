const fastify = require('fastify')();
require('dotenv').config();

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: process.env.PORT ?? 3000 }, function (err, addr) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server started in port ${addr.split(':').pop()}`);
})
