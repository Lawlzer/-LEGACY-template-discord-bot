const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    users: [{
        id: { type: String, required: true },
    }]
});

module.exports = mongoose.model('Server', ServerSchema);
