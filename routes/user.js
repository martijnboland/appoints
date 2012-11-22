
exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.view = function(req, res) {
  res.send("This is with id " + req.params.id)
}