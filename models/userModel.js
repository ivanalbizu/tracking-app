const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, 'Mail obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password obligatorio' ]
    },
    name: {
        type: String
    },
    role: {
        type: String
    }
});
    
const User = mongoose.model('User', userSchema)

module.exports = User