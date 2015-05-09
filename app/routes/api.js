var Post   = require('../models/post');
var User   = require('../models/user');
var jwt    = require('jsonwebtoken');
var config = require('../../config');
var secret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();

//---------------------------------------
//  user route
//---------------------------------------

    apiRouter.route('/users')
        .post(function(req, res) {

            var user = new User();
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function (err) {
                    if (err) {
                        if (err.code === 11000)
                            return res.json({ success: false, message: 'user already exists' });
                        else
                            return res.send(err);
                    }

                    res.json({ message: 'User created!' });
            });

        });

//---------------------------------------
//  END user route
//---------------------------------------
//***************************************
//---------------------------------------
//  posts route
//---------------------------------------

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
            Post.find()
                .sort({ _id : -1 })
                    .exec(function(err, posts) {
                        if (err) res.send(err);
                        return res.json(posts);
                    });

        });

//---------------------------------------
//  END post routes
//---------------------------------------
//***************************************
//---------------------------------------
//  single post route
//---------------------------------------
    apiRouter.route('/posts/:post_id')
        .get(function(req, res) {
            Post.findById(req.params.post_id, function(err, post) {
                if (err) res.send(err);
                return res.json(post)
            })
        });

//---------------------------------------
//  END single post route
//---------------------------------------
//***************************************
//---------------------------------------
//  auth route
//---------------------------------------
    apiRouter.post('/authenticate', function(req, res) {

        User.findOne({
            email: req.body.email
        }).select('email password').exec(function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {

                var validPassword = user.comparePassword(req.body.password);

                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Wrong password.'
                    });
                } else {

                    var token = jwt.sign({
                            name: user.name,
                            email: user.email
                        }, secret, {
                            expiresInMinutes: 1440
                        });

                    res.json({
                        success: true,
                        message: 'Token created.',
                        token: token
                    });
                }

            }

        });
    });

    apiRouter.use(function(req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decode) {
                if (err)
                    return res.json({ success: false, message: 'Failed to authenticate.' });
                else
                    req.decoded = decoded
            })
        } else {
            return res.status(403).send({
                success: false,
                message: 'A token was not provided.'
            });
        }
        next();
    });
//---------------------------------------
//  END auth route
//---------------------------------------

    return apiRouter;

};
