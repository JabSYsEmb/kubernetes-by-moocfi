const fastify = require('fastify')({logger: true});
const crypto = require('crypto');

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

const randomness_generator = {
  random: crypto.randomBytes(20).toString('hex'),
  log: () => console.log(new Date(), randomness_generator.random),
  log_each_five_sec: () => {
    randomness_generator.log();
    setTimeout(randomness_generator.log_each_five_sec, 5000);
  }
}

fastify.get('/', function (_req, reply) {
  reply.send({ hash : randomness_generator.random, timestamp: new Date() })
})

// Run the server!
fastify.listen({ host: '0.0.0.0', port: process.env.PORT ?? 4000 }, function (err, addr) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server started in port ${addr.split(':').pop()}`);
})
