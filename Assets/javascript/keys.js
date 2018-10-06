// DOTENV require function-------------------------------------------------------------------------------------------------------------
require('dotenv').config()

// SPOTIFY SEARCH FUNCTION (installed in Terminal so doesn't need a require function to make the API call)--------------------------
search: function({type: 'artist OR album OR track', query: 'My search query', limit: 20}, callback);

// OMDB require function------------------------------------------------------------------------------------------------------------
var request = require('request');
var omdbAPI = 'http://www.omdbapi.com/?apikey=[yourkey]&'
request(omdbAPI, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// OMDB require function------------------------------------------------------------------------------------------------------------
var request = require('request');
var bandsInTownAPI = 'rest.bandsintown.com/?artists/{artistname}/events&apikey=3cc8f67ce1372e99e403cc28219f8fad'
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