function validateBody(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false
    });

    if (!error) {
      req.body = value;
      return next();
    }

    const message = error.details.map((d) => d.message).join(', ');
    if (req.flash) {
      req.flash('error', message);
      return res.redirect('back');
    }

    return res.status(400).json({ error: message });
  };
}

module.exports = { validateBody };
