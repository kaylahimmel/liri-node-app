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
var omdbAPI = 'http://www.omdbapi.com/?apikey=trilogy&'

// request the API from OMDB
request(omdbAPI, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// BANDSINTOWN require function-----------------------------------------------------------------------------------------------------
// create bandsintownURL that uses the userQuery to complete the URL
var bandsintownURL = 'https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=3cc8f67ce1372e99e403cc28219f8fad'

// use the user's input to get the name of the venue, venue location, date of the Event (using moment to format this as "MM/DD/YYYY")
request(bandsintownURL, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// COMMANDS-----------------------------------------------------------------------------------------------------------------------
// "concert-this" command (use the userQuery to get the name and location of the venue, and date of the Event (use moment to format date: "MM/DD/YYYY")
function concert-this(venueName, venueLocation, dateTime) {
    this.venueName = "venue.name";
    this.venueLocation = "venue.city" + ", " + "venue.region" + " " + "venue.country";
    this.dateTime = datetime;
}

// "spotify-this-song" command (use the user's input to get the artist, song name, a preview link of the song from Spotify, and the album)
function spotify-this-song(artist, songName, spotifyPreview, albumName) {
  this.artist = "items.album.artists.name";
  this.songName = "tracks.items.name";
  this.spotifyPreview =  "items.preview_url";
  this.albumName =  "items.album.name";
}

// "movie-this" command (use the user's input to get the movie title, release year, IMDB and Rotten Tomatoes ratings, country where produced, and language, plot, and actors in the movie.
function movie-this(title, releaseYear, ratingIMDB, ratingRotTom, country, language, plot, actors) {
  this.title = "";
  this.releaseYear = "";
  this.ratingIMDB =  "";
  this.ratingRotTom =  "";
  this.country = "";
  this.language = "";
  this.plot = "";
  this.actors = "";
}
