// REQUIRED NPM BUILT-IN FUNCTIONS--------------------------------------------------------------------------------------------------
// DOTENV (require that node configure the dotenv package)
require("dotenv").config();

// FS (require that node use built-in "FS" functionality)
var fs = require("fs")

// REQUEST (require that node use built-in "Request" functionality--use for OMDB and Bandsintown APIs)
var request = require('request'); 

// MOMENT (require that node use built-in "Moment" functionality)
var moment = require('moment');
// moment().format();

// SPOTIFY (require that node use the node-spotify-api)
var Spotify = require('node-spotify-api');

// import the Spotify keys from the keys.js file
var keys = require("./keys.js");


// GLOBAL VARIABLES-----------------------------------------------------------------------------------------------------------------
// process the arguments taken in the terminal starting with the 3 one since 1 and 2 aren't useful to us
var nodeArgs = process.argv.slice(2);

// assign "command" to the new first node argument in the array (which is now the concert-this, spotify-this-song, movie-this commands, and do-what-it-says commands)
var command = nodeArgs[0];

// assigns "userInput" to new the second node argument in the array (which is now the artist, movie, or song the user searches)
var userInput = nodeArgs.slice(1).join("+");

// error variable
var errorMsg = "An error has occurred while getting the "

// initialize the Spotify session
var spotify = new Spotify(keys.spotify);

// function written out here so it doesn't have to be embedded in the console.log
var getArtistNames = function(artist) {
    return artist.name;
};


// "SPOTIFY-THIS-SONG" command (use the user's input to get the artist, song name, a preview link of the song from Spotify, and the album)
function findSong(userQuery) {
    if (userQuery === undefined || null) {
        userquery = "What's my age again";
    }
    
    spotify.search(
        {
            type: "track",
            query: userQuery 
        },
        
        function(error, data) {
            if (error) {
                return console.log(error)
            };
            // The full response object
            var songs = data;
            
            // append search results to the "log.txt" file
            fs.appendFile('log.txt', userQuery + ' (song search)\n', function(error) {
                if (error) {
                    return console.log(error)
                } 
            });

            // variable to use instead of the full dot notation path
            var songData = songs.tracks.items;
            
            // show "songData" for the first 4 songs that return in the the search
            for (var i = 0; i < 4; i++) {
                console.log("The song " + songData[i].name + " is from the album " + songData[i].album.name + 
                    " and is by " + songData[i].artists.map(getArtistNames) + ". Here's a preview: " + songData[i].preview_url);
                console.log("\n-----------------------------------------------------------------------\n")
            };
        })
};


// "CONCERT-THIS" COMMAND----------------------------------------------------------------------------------------------------------
// (use the userQuery to get the name and location of the venue, and date of the Event (use moment to format date: "MM/DD/YYYY")
function findConcert(userQuery) {
    if (userQuery === undefined) {
        userQuery = "Kitten"
    };
    // create bandsintownURL that uses the userQuery to complete the URL
    var bandsintownURL = 'https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=3cc8f67ce1372e99e403cc28219f8fad'
    // implement the bandintown API call request
    request(bandsintownURL, function (error, response, body) {
        // append search results to the "log.txt" file
        fs.appendFile('log.txt', userQuery + ' (concert search)\n', function(error) {
            if (error) {
                return console.log(error)
            } 
        });
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
            console.log("The next " + userQuery + " concert is at " + venueInfo.name + " in " + venueInfo.city + ", " + 
                venueInfo.region + " on " + standardDate + " and it starts at " + standardTime + "pm local time.");
            console.log("\n-----------------------------------------------------------------------\n")
        } else {
            console.log(error) // Print the error if one occurred
        }
    });
};


// "MOVIE-THIS" command (use the user's input to get the movie title, release year, IMDB and Rotten Tomatoes ratings, country where produced, and language, plot, and actors in the movie.
function findMovie(userQuery) {
    // OMDB require function------------------------------------------------------------------------------------------------------------
    var omdbAPI = 'http://www.omdbapi.com/?t=' + userQuery + '&plot=short&apikey=trilogy'
    // if statement to add a default value if the user doesn't enter one
    if (userQuery === undefined) {
        userQuery = "Mr.+Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>" + "\nIt's on Netflix!")
    }
    // implement the OMDB API call request
    request(omdbAPI, function (error, response, body) {
        
        fs.appendFile('log.txt', userQuery + ' (movie search)\n', function(error) {
            if (error) {
                return console.log(error)
            } 
        });

        // variable to use instead of the full dot notation path
        var parseResults = JSON.parse(body);
        var rotTomRating = parseResults.Ratings[1];
        var RatingValue = rotTomRating.Value;

        // display parsed results
        if (!error && response.statusCode === 200) {
            console.log(userQuery + " was realeased in " +  parseResults.Language + " in " + parseResults.Release + 
                " and was filmed in " + parseResults.Country + ".")
            console.log("The plot is: " + parseResults.Plot + ". The top-billed actors include: " + parseResults.Actors + ".");
            console.log("IMDB gave it " + parseResults.imdbRating + " out of 10 while Rotten Tomatoes gave it " + RatingValue);
            console.log("\n-----------------------------------------------------------------------\n")
        } else {
            console.log(error) // Print the error if one occurred
        };
    })
}; 


// "DO-WHAT-IT-SAYS" command (use the song name from the random.txt file to choose what to display for the user)
function runRandomTxt() {
    fs.readFile("./random.txt", "utf-8", function(error, data) {
        if (error) {
            return console.log(error)
        };

        var randomSplit = data.split(",");
        
        var fileCommand = randomSplit[0];

        var fileQuery = randomSplit[1];

        if (fileCommand === "movie-this") {
            findMovie(fileQuery)
        } else if (fileCommand === "spotify-this-song") {
            findSong(fileQuery)
        } else if (fileCommand === "concert-this") {
            findConcert(fileQuery)
        };
    })
};


// DETERMINE COMMAND TO RUN AND CALL IT
// the (/\+/g,' ') code replaces the plus signs in multi-word searches with spaces instead
if (command === "movie-this") {
    findMovie(userInput.replace(/\+/g,' '))
} else if (command === "spotify-this-song") {
    findSong(userInput.replace(/\+/g,' '))
} else if (command === "concert-this") {
    findConcert(userInput.replace(/\+/g,' '))
} else if (command === "do-what-it-says") {
    runRandomTxt()
};