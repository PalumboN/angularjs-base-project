authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

send = (res) =>
(error, result) => {
	if (error)
		res.status(500).send({ error })
	else
		res.send(result)
}

crud = (router, uri, model, sort) => {
	if (sort) {
		router.get(uri, (req, res, next) => {req.apiQuery = {sort}; next()}, model.httpGet())
	} else {
		router.get(uri, model.httpGet())
	}
	router.post(uri, authMiddleware, model.httpPost())
	router.route(uri + '/:id')
    .get(model.httpGet())
    .put(authMiddleware, model.httpPut())
    .delete(authMiddleware, model.httpDelete())
}


module.exports.authMiddleware = authMiddleware
module.exports.send = send
module.exports.crud = crud
