const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const messrouter = require("./routes/message");
const conversationrouter = require("./routes/conversation");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected mongo');
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auths", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conv", conversationrouter);
app.use("/api/mess", messrouter);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error); 
    }
  });

app.get("/", (req, res) => {
    res.send('Welcome to homepage');
});

app.listen(8800, () => {
    console.log('Backend server is running');

});