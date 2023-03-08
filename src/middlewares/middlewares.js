export const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/api/auth/login");
  } else {
    next();
  }
};

export const msgFlash = (req, res, next) => {
  const error_message = req.flash("error")[0];
  const success_message = req.flash("success")[0];
  res.locals.error_message = error_message;
  res.locals.success_message = success_message;
  next();
};
