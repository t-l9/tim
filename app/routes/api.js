var Post = require('../models/post');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.route('/posts')
        .post(function(req, res) {

            var post = new Post();

            post.title   = req.body.title;
            post.content = req.body.content;
            post.date    = req.body.date;
            post.img     = req.body.img;
            post.topic   = req.body.topic;

            post.save(function(err) {

                if (err) {
                    if (err.code == 11000) {
                        res.json({
                            success: false,
                            message: 'That post exists already.'
                        });
                    } else {
                        res.send(err);
                    }
                }

                res.json({ message: 'Post created.' });
            });
        })

        .get(function(req, res) {
            Post.find(function(err, users) {
                if (err) res.send(err);
                res.json(users);
            });
        });

    return apiRouter;

};
