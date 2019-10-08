const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        }).populate('movies');
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteMany: function(req,res){
        Actor.findOne({_id:req.params.id},function(err,actor){
            if(err){

            }
            for(let i=0;i<actor.movies.length;i++){
                Movie.findOneAndRemove({_id:actor.movies[i]},function(err){
                    if(err){

                    }
                })
            }
            Actor.findByIdAndRemove({_id:req.params.id},function(err){
                if(err){

                }
            })
            res.json();
        });
    },
    deleteAFM:function(req,res){

        Actor.findOne({_id:req.params.actorId},function(err,actors){
            console.log(req.params.movieId);
            if(err){

            }
            for(let i=0;i<actors.movies.length;i++){
                if(actors.movies[i]==req.params.movieId){
                    console.log('running');
                    actors.movies.splice(i,i+1);
                }
            }
            actors.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actors);
            });
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body}, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    actorMovie:function(req,res){
        let a=[];
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                for(let i=0;i<actors.length;i++){
                    if(actors[i].movies.length>2){
                        a.push(actors[i]);
                    }
                }
                res.json(a);
            }
        });
    },
};