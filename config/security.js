const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many auth requests. Please try again in 15 minutes.'
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many payment attempts. Please try again later.'
});

module.exports = {
  helmetMiddleware,
  authLimiter,
  paymentLimiter
};
