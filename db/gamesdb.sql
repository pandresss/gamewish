
-- gamesdb is the database

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS games CASCADE;


CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE games(
id SERIAL PRIMARY KEY,
gid TEXT NOT NULL,
name TEXT NOT NULL,
image TEXT NOT NULL,
release TEXT NOT NULL,
summary TEXT NOT NULL,
comments TEXT NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);



INSERT INTO users (email, password_digest) VALUES
('padres.sanabria@gmail.com', 'admin');

INSERT INTO games (gid, name, image, release, summary, comments, user_id) VALUES
 (7346, 'The Legend of Zelda: Breath of the Wild', '//images.igdb.com/igdb/image/upload/t_thumb/jk9el4ksl4c7qwaex2y5.png', '2017-Mar-03', 'Step into a world of discovery, exploration and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across fields, through forests and to mountain peaks as you discover what has become of the ruined kingdom of Hyrule in this stunning open-air adventure.', 'I want this game', 1);










