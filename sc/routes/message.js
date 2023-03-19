const router = require("express").Router();

const Message = require("../models/message");

//add
router.post("/", async (req, res) => {
    const newmsg = new Message(req.body);
    try {
        const savedmsg = await newmsg.save();
        res.status(200).json(savedmsg);
    } catch (error) {
    res.status(500).json(error);
    }
})
// gett
router.get('/:convid',async (req, res) => {
    try {
        const msg = await Message.find({
            conversationId:req.params.convid,
        })
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
