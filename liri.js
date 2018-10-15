// REQUIRED NPM BUILT-IN FUNCTIONS--------------------------------------------------------------------------------------------------
// DOTENV (require that node configure the dotenv package)
require("dotenv").config();

// FS (require that node use built-in "FS" functionality)
var fs = require("fs")

// REQUEST (require that node use built-in "Request" functionality--use for OMDB and Bandsintown APIs)
var request = require('request'); 

// // Load the inquirer package
// var inquirer = require("inquirer");

// MOMENT (require that node use built-in "Moment" functionality)
var moment = require('moment');
// moment().format();

// SPOTIFY (require that node use the node-spotify-api)
var Spotify = require('node-spotify-api');

// import the Spotify keys from the keys.js file
var keys = require("./keys.js");

// access spotify keys in .env file
var spotify = new Spotify(keys.spotify);


// GLOBAL VARIABLES-----------------------------------------------------------------------------------------------------------------
// process the arguments taken in the terminal starting with the 3 one since 1 and 2 aren't useful to us
var nodeArgs = process.argv.slice(2);

// assign "command" to the new first node argument in the array (which is now the concert-this, spotify-this-song, movie-this commands, and do-what-it-says commands)
var command = nodeArgs[0];

// assigns "userInput" to new the second node argument in the array (which is now the artist, movie, or song the user searches)
var userInput = nodeArgs.slice(1).join("+");

// error variable
var errorMsg = "An error has occurred while getting the "


// "CONCERT-THIS" COMMAND----------------------------------------------------------------------------------------------------------
// (use the userQuery to get the name and location of the venue, and date of the Event (use moment to format date: "MM/DD/YYYY")
function concertThis(userQuery) {
    if (userQuery === undefined) {
        userQuery = "Backstreet+Boys"
    };
    // create bandsintownURL that uses the userQuery to complete the URL
    var bandsintownURL = 'https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=3cc8f67ce1372e99e403cc28219f8fad'
    // implement the bandintown API call request
    request(bandsintownURL, function (error, response, body) {
        // append search results to the "log.txt" file
        fs.appendFile('log.txt', userQuery, function (error) {
            if (error) {
                return console.log(errorMsg + 'concert data: ', error)
            } 
        });
        // console.log(JSON.parse(body))
        if (!error && response.statusCode === 200) {
            // shorter variables to use in place of concert JSON data in code
            var concertBody = JSON.parse(body)[0];
            var venueInfo = concertBody.venue;
            var timeInfo = concertBody.datetime;
            // Split concert "datetime" string into two pieces and reformat for easier viewing
            var timeArray = timeInfo.split("T")
            var standardTime = moment(timeArray[1], "HH:mm:ss A").format("h:mm")
            var standardDate = moment(timeArray[0]).format('MM/DD/YY');
            // concert info to print in the terminal if the concert-this <bandname> are used
            console.log("The " + userQuery + " concert is at: " + venueInfo.name);
            console.log("The concert location is in: " + venueInfo.city + ", " + venueInfo.region + " " + venueInfo.country);
            console.log("The concert is on " + standardDate + " and starts at: " + standardTime + "pm local time");
        } else {
            console.log(errorMsg + 'concert data: ', error) // Print the error if one occurred
        }
    });
};


// "SPOTIFY-THIS-SONG" command (use the user's input to get the artist, song name, a preview link of the song from Spotify, and the album)
function spotifyThisSong(userQuery) {
    if (userQuery === undefined) {
        userQuery = "I+saw+the+sign";
    }
    // create bandsintownURL that uses the userQuery to complete the URL
    var spotifyURL = 'https://api.spotify.com/v1/search?query=' + userQuery + '&type=track&market=US&offset=0&limit=5'
    // implement the bandintown API call request
    request(spotifyURL, function (error, response, body) {
        // get spotify keys from .env file
        fs.readFile(".env", function(err, data) {
            // If there's an error reading the file, we log it and return immediately
            if (err) {
              return console.log(errorMsg + 'keys from the .env file: ' + err)
            } 
            // append search results to the "log.txt" file
            fs.appendFile('log.txt', userQuery, function(error, data) {
                if (error) {
                    return console.log(errorMsg + 'song data: ' + error)
                }
                // for (i = 0; i < data.tracks.items.length; i++) {
                //     console.log(data.tracks.items[i]);
                // } 
            });
            if (!error && response.statusCode === 200) {
                // shorter variables to use in place of concert JSON data in code
                var musicBody = JSON.parse(response)[0];
                var itemsInfo = musicBody.items;
                var albumInfo = itemsInfo.album;
                var artistsInfo = albumInfo.artists
                // concert info to print in the terminal if the spotify-this-song <song name> are used
                console.log(userQuery + " is by: " + artistsInfo.name);
                console.log("The song name is: " + itemsInfo.name);
                console.log("Check out a preview of the song at: " + itemsInfo.preview_url);
                console.log("This song is from the album: " + albumInfo.name)
            } else {
                console.log(errorMsg + 'song data: ', error) // Print the error if one occurred
            }
        });
    });  
};

// "MOVIE-THIS" command (use the user's input to get the movie title, release year, IMDB and Rotten Tomatoes ratings, country where produced, and language, plot, and actors in the movie.
function movieThis(userQuery) {
    // OMDB require function------------------------------------------------------------------------------------------------------------
    var omdbAPI = 'http://www.omdbapi.com/?t=' + userQuery + '&plot=short&apikey=trilogy'
    // if statement to add a default value if the user doesn't enter one
    if (userQuery === undefined) {
        userQuery = "Mr.+Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>" + "\nIt's on Netflix!")
    }
    // implement the OMDB API call request
    request(omdbAPI, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(userQuery + " was realeased in: " + JSON.parse(body).Release);
        console.log("IMDB gave it: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes gave it: " + JSON.parse(body).Ratings[1].Value);
        console.log(userQuery + " was filmed in: " + JSON.parse(body).Country);
        console.log("The language spoken in " + userQuery + " is: " + JSON.parse(body).Language);
        console.log("The plot is: " + JSON.parse(body).Plot);
        console.log("Top-billed actors include: " + JSON.parse(body).Actors)
    } else {
        console.log(errorMsg + 'movie data:', error) // Print the error if one occurred
    };
    })
}; 

// "DO-WHAT-IT-SAYS" command (use the song name from the random.txt file to choose what to display for the user)
function doWhatItSays() {
    console.log(require("/random.txt"));
};


// DETERMINE COMMAND TO RUN AND CALL IT
// the (/\+/g,' ') code replaces the plus signs in multi-word searches with spaces instead
if (command === "movie-this") {
    movieThis(userInput.replace(/\+/g,' '))
} else if (command === "spotify-this-song") {
    spotifyThisSong(userInput.replace(/\+/g,' '))
} else if (command === "concert-this") {
    concertThis(userInput.replace(/\+/g,' '))
};