// REQUIRED NPM BUILT-IN FUNCTIONS--------------------------------------------------------------------------------------------------
// DOTENV (require that node configure the dotenv package)
require("dotenv").config();

// FS (require that node use built-in "FS" functionality)
var fs = require("fs")

// REQUEST (require that node use built-in "Request" functionality--use for OMDB and Bandsintown APIs)
var request = require('request'); 

// MOMENT (require that node use built-in "Moment" functionality)
var moment = require('moment');
moment().format();


// NODE PROCESS.ARGV AND USERQUERY VARIABLE----------------------------------------------------------------------------------------
// force node to process the arguments taken in the terminal
var nodeArgs = process.argv;

// user's input (will be used for the concert-this, spotify-this-song, and movie-this commands)
var userQuery = "";


// SPOTIFY VARIABLES, REQUIREMENTS, AND FUNCTIONS---------------------------------------------------------------------------------------------------
// SPOTIFY (require that node use the node-spotify-api)
var Spotify = require('node-spotify-api');

// import the Spotify keys from the keys.js file
var Spotify = require("./keys.js");

// access spotify keys in .env file
var spotify = new Spotify(keys.spotify);

// code from spotify api documentation--not sure if i need it
spotify.search({ 
    type: 'track', 
    query: 'All the Small Things' 
    }, 
    function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    console.log(data); 
});


// OMDB require function------------------------------------------------------------------------------------------------------------
var omdbAPI = 'http://www.omdbapi.com/?t=' + userQuery + '&plot=short&apikey=trilogy'

// implement the OMDB API call request
request(omdbAPI, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("The movie's release year is: " + JSON.parse(body).Release);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
      console.log("The movie was filmed in: " + JSON.parse(body).Country);
      console.log("The movie is in: " + JSON.parse(body).Language);
      console.log("The plot of this movie is: " + JSON.parse(body).Plot);
      console.log("The actors in this movie include, but are not limited to: " + JSON.parse(body).Actors)
    }, else {
      console.log('Error:', error); // Print the error if one occurred
});


// BANDSINTOWN require function-----------------------------------------------------------------------------------------------------
// create bandsintownURL that uses the userQuery to complete the URL
var bandsintownURL = 'https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=3cc8f67ce1372e99e403cc28219f8fad'

// implement the bandintown API call request
request(bandsintownURL, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("The " + userQuery + " concert is at: " + JSON.parse(body).venue);
    console.log("The concert location is in: " + JSON.parse(body).venue.city + ", " + venue.region + " " + venue.country);
    console.log("The " + userQuery + " concert starts at: " + JSON.parse(body).datetime);
  }, else {
    console.log('Error:', error); // Print the error if one occurred
});


// COMMANDS-----------------------------------------------------------------------------------------------------------------------
// "CONCERT-THIS" command (use the userQuery to get the name and location of the venue, and date of the Event (use moment to format date: "MM/DD/YYYY")
function concert-this(venueName, venueLocation, dateTime) {
    this.venueName = "venue.name";
    this.venueLocation = "venue.city" + ", " + "venue.region" + " " + "venue.country";
    this.dateTime = datetime;
}

// "SPOTIFY-THIS-SONG" command (use the user's input to get the artist, song name, a preview link of the song from Spotify, and the album)
function spotify-this-song(artist, songName, spotifyPreview, albumName) {
    this.artist = "items.album.artists.name";
    this.songName = "tracks.items.name";
    this.spotifyPreview =  "items.preview_url";
    this.albumName =  "items.album.name";
}

// "MOVIE-THIS" command (use the user's input to get the movie title, release year, IMDB and Rotten Tomatoes ratings, country where produced, and language, plot, and actors in the movie.
function movie-this(title, releaseYear, ratingIMDB, ratingRotTom, country, language, plot, actors) {
    this.title = "Title";
    this.releaseYear = "Release";
    this.ratingIMDB =  "imdbRating";
    this.ratingRotTom =  "";
    this.country = "Country";
    this.language = "Language";
    this.plot = "Plot";
    this.actors = "Actors";
}


// "DO-WHAT-IT-SAYS" command (use the song name from the random.txt file to choose what to display for the user)
function do-what-it-says() {
    console.log(spotify-this-song(random.txt));
};


