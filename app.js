const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
let path = require('path');
const app = express();
app.listen(8888);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true,useUnifiedTopology: true},function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actorss/:id', actors.deleteMany);
app.delete('/actorsss/:actorId/:movieId',actors.deleteAFM);
app.get('/extraTask', actors.actorMovie);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id',movies.deleteOne);
app.post('/movies/:id/actors', movies.addActor);
app.delete('/moviess/:movieId/:actorId',movies.deleteMFA);
app.get('/moviesYear/:year2/:year1',movies.getMovie);
app.get('/moviesIncrement',movies.updateYear);
app.delete('/movieAYear/:aYear',movies.deleteYear);