const express = require('express');
const talkRouter = express.Router();
const algorithmia = require('algorithmia');

var apiKey = 'simRuyh3cAqyQ76YeaquWK+rnfX1'
//var api_key = process.env.API_KEY //

var client = algorithmia(apiKey);


function  getApi (req, res) {
  console.log(req.body.inputurl)
  console.log("getting api");

  function getLinks() {
    var input = 'http://localhost:8080/feed';

    client
      .algo("algo://web/GetLinks/0.1.5")
      .pipe(input)
      .then(function(response) {
        console.log(response);
      })
  }
  function getText () {
    var input = getLinks();
    client
      .algo('algo://util/Url2Text/0.1.4')
      .pipe(input)
      .then(function(output) {
        console.log(output)
      })
  }

  function getSentiment () {

    var input = {
      "document" : getText()
    }
    client
      .algo('algo://nlp/SentimentAnalysis/1.0.4')
      .pipe(output)
      .then(function(output) {
        console.log(output)
      })
  }
}

talkRouter.route('/test').post(getApi)

// var client = algorithmia(api_key);
// //scrapping the web-page
// var input = "https://algorithmia.com";
// Algorithmia.client("simRuyh3cAqyQ76YeaquWK+rnfX1")
//            .algo("algo://web/GetLinks/0.1.5")
//            .pipe(input)
//            .then(function(output) {
//              console.log(output);
//            });

// //getting all text from a page
// var input = "http://github.com";
// Algorithmia.client("simRuyh3cAqyQ76YeaquWK+rnfX1")
//            .algo("algo://util/Url2Text/0.1.4")
//            .pipe(input)
//            .then(function(output) {
//              console.log(output);
//            });

// //text sentimeent analysis
// var input = {
//   "document": "I really like Algorithmia!"
// };
// Algorithmia.client("simRuyh3cAqyQ76YeaquWK+rnfX1")
//            .algo("algo://nlp/SentimentAnalysis/1.0.4")
//            .pipe(input)
//            .then(function(output) {
//              console.log(output);
//            });


// var input = 41;
// var client = Algorithmia.client("simRuyh3cAqyQ76YeaquWK+rnfX1");
// client.algo("algo://nlp/SentimentAnalysis/1.0.4")
// .pipe(input)
// .then(function(output) {
//   if(output.error)
//     return console.error("error: " + output.error);
//   console.log(output.result);
// });
