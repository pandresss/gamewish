const Game = require('../../models/games');

const controller = {};

controller.index = (req, res) => {
user_id = req.user.id;
    Game
        .findAll(user_id)
        .then(data => {

        console.log(data);
            res.render('games/index', { games: data });

        })
        .catch(err => console.log('ERROR:', err));
};
controller.show = (req, res) => {

    const id = req.params.id;
    console.log(id);
    Game
        .findById(id)
        .then(data => {
          console.log(data);
            res.render('games/saved', { games:data });
        })
        .catch(err => console.log('ERROR:', err));
};

controller.edit = (req, res) => {
    const id = req.params.id;
    console.log('help me' + id);
    Game
        .findByGameId(id)
        .then(data => {
          console.log(data)
            res.render('games/edit', { games:data });
        })
        .catch(err => console.log('ERROR:', err));
};

module.exports = controller;
