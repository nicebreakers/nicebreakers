const isAdmin = (req, res, next) => {
  if (req.user /*&& INSERT HOW WE STORE ROLES HERE*/) next()
  else {
    console.log('AUTH-MIDDLEWARE: Request failed @ isAdmin')
    res.sendStatus(404)
  }
}

const isAuthenticated = (req, res, next) => {
  if (req.user) next()
  else {
    console.log('AUTH-MIDDLEWARE: Request failed @ isAuthenticated')
    res.sendStatus(404)
  }
}

module.exports = {isAdmin, isAuthenticated}
