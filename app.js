
var express = require('express.io');
var path = require('path');
var fs = require('fs');


var app = express();
var routes = require('./routes');

app.http().io();

app.io.set( 'log level', 1 );

app.configure(function(){
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.get('/', routes.index );
app.get('/:type', routes.index);


var Twit = require('twit');

var config = JSON.parse( fs.readFileSync( __dirname+'/configuration.json' ) );
var T = new Twit( config );

var stream = T.stream('statuses/sample');

stream.on('tweet', function (tweet) {
  //console.log(tweet.user.name,tweet.text);
  if( tweet.coordinates || tweet.geo )
    app.io.broadcast( 'tweet', tweet );
});


app.listen( 80 );
