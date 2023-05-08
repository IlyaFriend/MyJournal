const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Blog = require('../models/blogs');

const router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        Blog.find({})
            .populate('comments.author')
            .populate('writer')
            .then(blogs => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(blogs);
                },
                err => { next(err); })
            .catch(err => { next(err); });
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Blog.create({...req.body, writer : req.user._id})
            .then(_ => {
                    res.statusCode = 201;
                    res.end('Successfully created blog');
                  },
                  err => { next(err); })
            .catch(err => { console.log(err); next(err); });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('You are not allowed to do this action!');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('You are not allowed to do this action!');
    })


router.route('/:blogId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .populate('comments.author')
            .populate('writer')
            .then(blog => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(blog);
                  },
                  err => { next(err); })
            .catch(err => { next(err); })
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        res.statusCode = 403;
        res.end('You are not allowed to do this action!');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Blog.findByIdAndUpdate(req.params.blogId, { $set: req.body }, { new: true })    
            .then(blog => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(blog);
                  },
                  err => { next(err); })
            .catch(err => { next(err); });
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Blog.findByIdAndRemove(req.params.blogId)
            .then(_ => {
                        res.statusCode = 200;
                        res.end('Succesfully deleted blog!')
                  }, 
                  err => { next(err); })
            .catch(err => { next(err); });
    })


router.route('/:blogId/comments')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .populate('comments.author')
            .then(blog => {
                        if (blog) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(blog.comments);
                            return;
                        }
                        err = new Error('Blog' + req.params.blogId + 'not found');
                        err.status = 404;
                        return next(err);
                  }, 
                  err => { next(err); })
            .catch(err => { next(err); });
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .then(blog => {
                        if (blog) {
                            req.body.author = req.user._id;
                            let oldComments = [...blog.comments]
                            blog.comments = blog.comments.concat([req.body]);
                            blog.save()
                                .then(
                                    blog => {
                                        Blog.findById(blog._id)
                                            .populate('comments.author')
                                            .then(_ => {
                                                let newComment = blog.comments.find(comment => !oldComments.find(oldComment => oldComment._id === comment._id))
                                                res.statusCode = 201;
                                                res.json(newComment._id); 
                                            })
                                    }, 
                                    err => { 
                                        console.log('error comments', err)
                                        next(err); }
                                )
                            return;
                        }
                        err = new Error('Blog' + req.params.blogId + 'not found');
                        err.status = 404;
                        return next(err);
                  }, 
                  err => { next(err); })
            .catch(err => { next(err); });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('You are not allowed to do this action!');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .then(blog => {
                        if (blog) {
                            for (let i = blog.comments.length-1; i >= 0; i--) {
                                blog.comments.id(blog.comments[i]._id).remove();
                            }
                            blog.save()
                            res.statusCode = 200;
                            res.end('Succesfully deleted comments!')
                            return;
                        }
                        err = new Error('Blog' + req.params.blogId + 'not found');
                        err.status = 404;
                        return next(err);
                  }, 
                  err => { next(err); })
    })


router.route('/:blogId/comments/:commentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .populate('comments.author')
            .then(blog => {
                        if (blog && blog.comments.id(req.params.commentId) != null) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(blog.comments.id(req.params.commentId));
                            return;
                        }
                        err = new Error('Blog or Comment not found');
                        err.status = 404;
                        return next(err);
                  }, 
                  err => { next(err);})
            .catch(err => { next(err); })
    })
    .post(authenticate.verifyUser, (req, res) => {
        res.statusCode = 403;
        res.end('You are not allowed to do this action!');
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .then(blog => {
                        if (!blog.comments.id(req.params.commentId).author.equals(req.user._id)) {
                            err = new Error('You are not allowed to do this action!');
                            err.status = 403;
                            return next(err);
                        }
                        if (blog && blog.comments.id(req.params.commentId) != null) {
                            if (req.body.review) {
                                blog.comments.id(req.params.commentId).review = req.body.review;
                            }
                            blog.save()
                                .then(blog => {
                                            Blog.findById(blog._id)
                                                .populate('comments.author')
                                                .then(blog => {
                                                    res.statusCode = 200;
                                                    res.setHeader('Content-Type', 'application/json');
                                                    res.json(blog.comments);                    
                                                })
                                    }, err => { next(err); })
                            return;
                        }
                        err = new Error('Blog or Comment not found');
                        err.status = 404;
                        return next(err);
                  }, err => { next(err); })
            .catch(err => { next(err); });
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Blog.findById(req.params.blogId)
            .then(blog => {
                        if (!blog.comments.id(req.params.commentId).author.equals(req.user._id) && !req.user.admin) {
                            err = new Error('You are not allowed to delete comments of other users.');
                            err.status = 403;
                            return next(err);
                        }
                        if (blog && blog.comments.id(req.params.commentId) != null) {
                            blog.comments.id(req.params.commentId).remove();
                            blog.save()
                            res.statusCode = 200;
                            res.end('Succesfully deleted comment!')
                            return;
                        }
                        err = new Error('Blog or Comment not found');
                        err.status = 404;
                        return next(err);
                  }, 
                  err => { next(err); })
            .catch(err => { next(err); });
    })

router.route('/userBlogs/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200)} )
    .get(cors.cors, (req, res, next) => {
        console.log('\n', req.params.userId, '\n')
        Blog.find({ writer: req.params.userId })
        .populate('writer')
        .then(blogs => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(blogs);
        },
        err => { console.log(err)
            next(err); })
    .catch(err => { console.log(err)
        next(err); });
    })

module.exports = router;