const bcrypt = require('bcryptjs');
const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password, rounds),
  comparePassword: (password, hash) => bcrypt.compareSync(password, hash)
};
