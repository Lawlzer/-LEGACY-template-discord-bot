require('dotenv').config();
require.main.require('./etc/globals.js'); 

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

require.main.require('./adapters/discord_handler/index.js'); // does not need any functions called, just needs to be required

