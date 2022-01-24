require('dotenv').config();
require.main.require('./etc/globals.js'); 

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

require.main.require('./discord_handler/discord_handler.js'); // does not require any functions called

