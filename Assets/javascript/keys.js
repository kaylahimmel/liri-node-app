// DOTENV require function----------------------------------------------------------------------------------------------------------
require('dotenv').config()

// SPOTIFY require function---------------------------------------------------------------------------------------------------------
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "SPOTIFY_ID",
  secret: "SPOTIFY_SECRET"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// OMDB require function------------------------------------------------------------------------------------------------------------
var request = require('request');
var omdbAPI = 'http://www.omdbapi.com/?apikey=[yourkey]&'
request(omdbAPI, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// BANDSINTOWN require function-----------------------------------------------------------------------------------------------------
var request = require('request');
var bandsInTownAPI = 'rest.bandsintown.com/?artists" + artist + "/events?app_id=3cc8f67ce1372e99e403cc28219f8fad'
request(bandsInTownAPI, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// Moment require function----------------------------------------------------------------------------------------------------------
var moment = require('moment');
moment().format();



// Very last lines of code (according to instructions)
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};