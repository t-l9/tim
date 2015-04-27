var auth = require('basic-auth')

module.exports = function quick(checkAuth){

  return function(req, res, next){
    if (!req.headers['authorization']) {
      return onVisit()
    }

    checkAuth(auth(req), function(err, found){
      if (err || !found) return onFail()
      next()
    })

    function onVisit(){
      reject()
    }
    function onFail(){
      reject()
    }
    function reject(){
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm=""')
      res.end()
    }
  }
}
