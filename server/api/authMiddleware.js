const canOnlyBeUsedBy = (...roles) => (req, res, next) => {
  if (req.user && roles.includes('participant')) next()
  else if (
    req.user &&
    roles.includes('self') &&
    +req.params.userId === req.user.id
  )
    next()
  else if (req.user && roles.includes(req.user.role)) next()
  else {
    console.log(
      `Auth Middleware: User ${req.user} does not have permissions for ${roles}`
    )
    res.sendStatus(404)
  }
}

module.exports = canOnlyBeUsedBy
