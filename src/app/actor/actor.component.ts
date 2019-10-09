import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;

  mName: string = "";
  mYear: number = 0;

  aYear: number = 0;

  actorId: string = "";
  movieId: string = "";

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    console.log(this.section)
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.mName = "";
    this.mYear = 0;
    this.aYear = 0;
    this.actorId = "";
    this.movieId = "";

  }


  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.mName, year: this.mYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie By Year
  onDeleteYear() {
    this.dbService.deleteYear(this.aYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSelectA(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onSelectM(item) {
    this.mName = item.title;
    this.movieId = item._id;
  }

  //Add movie to actor
  onMovieToActor() {
    let obj = {_id:this.movieId};
    this.dbService.addMovieToActor(this.actorId,obj).subscribe(result => {
      this.onGetActors();
    });
  }

    //Get all Actors
}