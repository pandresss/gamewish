const db = require('../db');


const bcrypt = require('bcrypt');

// Boilerplate taken from tims code.

const User = {};

User.create = (user) => {
  const password = bcrypt.hashSync(user.password, 3);

  return db.oneOrNone(`
    INSERT INTO users
    (email, password_digest)
    VALUES
    ($1, $2)
    RETURNING *;`,
    [ user.email, password ]
  );
};

User.findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE email = $1;`,
    [email]
  );
};

module.exports = User;

