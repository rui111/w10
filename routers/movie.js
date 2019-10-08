var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        }).populate('actors');
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    updateYear: function (req, res) {
        Movie.updateMany({year:{$gt:1995}},{$inc:{year:7}},function(err,movie){
            if(err){

            };
            res.json(movie);
        });

    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    deleteMFA:function(req,res){

        Movie.findOne({_id:req.params.movieId},function(err,movies){
            if(err){

            }
            for(let i=0;i<movies.actors.length;i++){
                if(movies.actors[i]==req.params.actorId){
                    movies.actors.splice(i,i+1);
                }
            }
            movies.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movies);
            });
        });
    },
    getMovie:function(req,res){
        Movie.find({year: {$lte:req.params.year1,$gte:req.params.year2}},function(err,movie){
            if(err){

            }
            res.json(movie);
        })
    },
    deleteYear:function(req,res){
        Movie.find({year: {$lte:req.params.aYear}},function(err,movie){
            for(let i=0;i<movie.length;i++){
                Movie.findOneAndRemove({_id:movie[i]._id},function(err){
                    if (err) return res.status(400).json(err);
                    res.json();
                })
            }
        })
    }
};