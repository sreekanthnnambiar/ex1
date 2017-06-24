var express = require('express');
var router = express.Router();
var fs = require('fs'),
    app     = express();
var http = require('http');
var server = http.createServer(app);
var request=require('request');


var Twit=require('twit');//we can get this package details from www.npmjs.com
var T = new Twit({
  consumer_key:         'I4efZR5oNrhyQPHUaOoSR1HXu',
  consumer_secret:      'v5aiIOxPMRAOm80l3W5Kb8yokRiWfQ29JMhliN6HyrvpbjqTrO',
  access_token:         '877811802767216640-kvNUsnybenwRKRSoHrwRVOta1o0SDoj',
  access_token_secret:  'IkzVi1UPbSkukfzLtoVsPIELPk5cuPXcw9AlwFbvjhz2r',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


var tweetArray=[];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});
router.get('/tweets', function(req, res, next) {
  res.render('tweets');

});

router.post('/', function(req, res, next) {	

  var key=req.body.title;
  console.log(key);
getTweet(key,res);
});

function getTweet(ky,res1){

	var params={
    q:ky,
    count:5
}

T.get('search/tweets',params,gotData);

function gotData(err,data,response){
    var tweets=data.statuses;
    for(var i=0;i<tweets.length;i++){
        //console.log(tweets[i].text);
		tweetArray.push(tweets[i].text)
    }

	console.log(tweetArray);
res1.render('tweets',{tweetItems:tweetArray});

  
}
	
}


module.exports = router;
