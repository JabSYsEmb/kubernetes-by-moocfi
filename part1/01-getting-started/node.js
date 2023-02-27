const crypto = require('crypto');

const randomness_generator = {
  random: crypto.randomBytes(20).toString('hex'),
  log: () => console.log(new Date(), randomness_generator.random),
  log_each_five_sec: () => {
    randomness_generator.log();
    setTimeout(randomness_generator.log_each_five_sec, 5000);
  }
}

randomness_generator.log_each_five_sec()
