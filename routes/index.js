
/*
 * GET home page.
 */

exports.index = function(req, res){
  var type = req.params.type || 'globe';
  type = type.toLowerCase();
  var view = 'globe';
  if( type==='map' ) {
    view = 'map';
  }

  res.render( view, {
    title: 'Express'
  });
};