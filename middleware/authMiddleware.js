function ensureAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect("/auth/login");
}

function attachUserToLocals(req, res, next) {
  res.locals.isAuthenticated = Boolean(req.session && req.session.userId);
  res.locals.currentUser = req.session.user || null;
  next();
}

module.exports = { ensureAuth, attachUserToLocals };
