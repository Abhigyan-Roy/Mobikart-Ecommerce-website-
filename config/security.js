let helmet;
let rateLimit;

try {
  helmet = require('helmet');
} catch (err) {
  console.warn('Helmet not loaded. Continuing without helmet middleware:', err && err.message ? err.message : err);
}

try {
  rateLimit = require('express-rate-limit');
} catch (err) {
  console.warn('express-rate-limit not loaded. Continuing without rate limiting:', err && err.message ? err.message : err);
}

function passThroughMiddleware(req, res, next) {
  return next();
}

const helmetMiddleware = helmet
  ? helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  : passThroughMiddleware;

const authLimiter = rateLimit
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 80,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many auth requests. Please try again in 15 minutes.'
    })
  : passThroughMiddleware;

const paymentLimiter = rateLimit
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 30,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many payment attempts. Please try again later.'
    })
  : passThroughMiddleware;

module.exports = {
  helmetMiddleware,
  authLimiter,
  paymentLimiter
};
