require('dotenv').config();
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDir = path.join(__dirname, '../prod_logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDir
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  assetPath: process.env.ASSET || './assets',
  sessionCookie: process.env.SESSION_COOKIE || 'Ecommerce',
  sessionStore: process.env.SESSION_STORE || 'memory',
  db: process.env.DB_NAME || 'mongodb://127.0.0.1:27017/mobicart_db',
  smtp: {
    service: process.env.SMTP_SERVICE || 'gmail',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    }
  },
  googleClientId: process.env.CLIENT_ID || '',
  googleClientSecret: process.env.CLIENT_SECRET || '',
  googleCallbackUrl: process.env.CALL_BACK || 'http://localhost:7500/users/auth/google/callback',
  morgan: {
    mode: isProduction ? 'combined' : 'dev',
    options: { stream: accessLogStream }
  }
};
