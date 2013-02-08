$( function() {
  var colors = [
    0xd9d9d9,
    0xb6b4b5,
    0x9966cc,
    0x15adff,
    0x3e66a3,
    0x216288,
    0xff7e7e,
    0xff1f13,
    0xc0120b,
    0x5a1301,
    0xffcc02,
    0xedb113,
    0x9fce66,
    0x0c9a39,
    0xfe9872,
    0x7f3f98,
    0xf26522,
    0x2bb673,
    0xd7df23,
    0xe6b23a,
    0x7ed3f7
  ];
  io = io.connect();

  $tweets = $( '#tweets' );
  $tweets.on( 'mouseenter', '.media', function( evt ) {
    var $entry = $( evt.currentTarget );

  } );

  var createEntry = function( tweet ) {
    $entry = $( '<li class="media"></li>' );
    //console.log( tweet );
    var userName = tweet.user.screen_name || tweet.user.name;
    var userUrl = tweet.user.url || '#';
    var tweetImage = tweet.user.profile_image_url;

    var text = tweet.text;
    $entry.append( '<a class="pull-left" href="'+userUrl+'"><img class="media-object" src="'+tweetImage+'"></a>' );
    $entry.append( '<div class="media-body"><h4 class="media-heading">'+userName+'</h4><p>'+text+'</p></div>' );
    return $entry;
  };
  io.on( 'tweet', function( tweet ) {
    var point = tweet.geo || tweet.coordinates;
    var latitude = point.coordinates[0];
    var longitude = point.coordinates[1];
    var magnitude = 0.2;
    var color = Math.floor( Math.random()*colors.length );

    var data = [ latitude, longitude, magnitude, color ];
    globe.addData( data, { format: 'legend' } );

    // Create the geometry
    globe.createPoints();

    // Add to tweets
    $tweets.prepend( createEntry( tweet ) );
  });


  if(!Detector.webgl){
    Detector.addGetWebGLMessage();
  } else {
    // Where to put the globe?
    var container = document.getElementById( 'container' );

    // Make the globe
    var globe = DAT.Globe(document.getElementById('container'), function(label) {
      return new THREE.Color(colors[label]);
    });

    if( globe )
      $( document.body ).css( 'background', '#000' );

    // Begin animation
    globe.animate();
  }
});