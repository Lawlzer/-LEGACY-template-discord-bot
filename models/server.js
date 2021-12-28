const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    users: [{
        id: { type: String, required: true },
    }]
});

module.exports = mongoose.model('User', UserSchema);
