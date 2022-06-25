const withAuth = (request, response, next) => {
  if (!request.session.user_id) {
    response.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
