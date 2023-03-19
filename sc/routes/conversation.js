const router = require("express").Router();

const Conversation = require("../models/conversation");

//new conv
router.post("/",async (req, res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    });
    try {
        const saveconv = await newConversation.save();
        res.status(200).json(saveconv);
    } catch (error) {
        res.status(500).json(error);
    }
})
//get new

router.get('/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]} })
            res.status(200).json(conversation);
       
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;