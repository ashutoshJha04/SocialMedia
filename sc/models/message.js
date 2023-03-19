const mongoose = require('mongoose');

const messageschema = new mongoose.Schema({

    conversationId:{
        type: 'string',
    },
    senderId:{
        type: 'string',
    },
    text:{
        type:'string'
    }

},{timestamps:true});
module.exports = mongoose.model('Message', messageschema);