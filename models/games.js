const db = require('../db');

const Games = {};

Games.findAll = (user_id) => {
  return db.any('SELECT * FROM games WHERE user_id = $1',
    [user_id]);
};

Games.findByGameId = (id) => {
    return db.any('SELECT * FROM games WHERE id=$1', [id]);
};

Games.findById = (id) => {
    return db.any('SELECT * FROM games WHERE user_id=$1', [id]);
};
// this part is needed inorder for my users to save their wishlist
Games.create = (gid, name, image, release, summary, comments, user_id) => {
    return db.one('INSERT INTO games( gid, name, image, release, summary, comments, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning user_id;', [gid, name, image, release, summary, comments, user_id]);
};

Games.update = (id, comments) => {
    return db.one(
        'UPDATE games SET comments = $2 WHERE id = $1 returning user_id', [id, comments]
    );
};
Games.destroy = (id) => {
  return db.one(
    'DELETE FROM games WHERE id = $1 returning user_id',
    [id]
  );
};


module.exports = Games;
