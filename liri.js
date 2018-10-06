// require that node configure the dotenv package
require("dotenv").config();

// import the keys.js file
var Spotify = require("./keys.js");

// access spotify keys in .env file
var spotify = new Spotify(keys.spotify);