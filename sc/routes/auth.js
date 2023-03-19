const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// Register
router.post("/register",async(req,res)=>{
     try {
        //gen new pass
        const salt =  await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt);
        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashed,
         });
         //save user and respond
        const user = await newUser.save();
       
        res.status(200).json(newUser);

     } catch (error) {
        console.log(error);
        
     }
});

//Login

router.post("/login",async(req,res)=>{
     try {
        const user = await User.findOne({email:req.body.email});
        !user&&res.status(404).json("user not found");
        const valiud = await bcrypt.compare(req.body.password,user.password);
        !valiud && res.status(400).json('wrong pass');
        res.status(200).send(user);

     } catch (error) {
        res.status(500).json(error);

        
     }
})
module.exports = router; 