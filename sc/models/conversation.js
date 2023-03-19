const mongoose = require('mongoose');
const conversationschema = new mongoose.Schema(
    {
        members:{
            type:Array,
        }
    }
    ,
    {timestamp: true}
)
module.exports = mongoose.model("Conversation",conversationschema);