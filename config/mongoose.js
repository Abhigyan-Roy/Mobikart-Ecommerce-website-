const mongoose = require('mongoose');
const dns = require('dns');
const config = require('./app-config');

// If your network DNS blocks SRV records (common cause of ECONNREFUSED on Atlas),
// forcing public resolvers here can unblock `mongodb+srv://...` lookups.
if (typeof config.db === 'string' && config.db.startsWith('mongodb+srv://')) {
  const servers = (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (servers.length) {
    try {
      dns.setServers(servers);
    } catch (e) {
      console.error('Failed to set DNS servers:', e?.message || e);
    }
  }
}

mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);
mongoose.set('bufferTimeoutMS', 0);

// connect to the database (catch to avoid crashing on DNS/network failures)
mongoose
  .connect(config.db, {
    serverSelectionTimeoutMS: 15000
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err?.message || err);
  });

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

module.exports = db;
