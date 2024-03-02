const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const App = express();
App.use(express.json());
// App.use(cors())
app.use(cors({
  origin: 'https://example.com',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Enable credentials
}));


const mongodb = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://aniketkushwaha0408:Aniket12345@login.gvlzkmg.mongodb.net/Login?retryWrites=true&w=majority&appName=login"
        )
      .then(() => {
        console.log("connected to  database");
      })
      .catch(() => {
        console.log("failed to connect to database");
      });
  } catch (e) {
    console.log(e);
  }
};
mongodb();

const userSchema = new mongoose.Schema({
  title: String,
  img: String,
  desc: String,
  downloadurl: String,
});

const usermodel = mongoose.model("user", userSchema, "newdata");

App.post("/login", async (req, res) => {
  try {
    const { title, img, desc, downloadurl } = req.body;
    const findemail = await usermodel.findOne({ title });
    if (findemail) {
      return res.status(300).json({
        message: "email is already present",
      });
    } else {
      const createuser = await usermodel.create({
        title,
        img,
        desc,
        downloadurl,
      });
      return res.status(200).json({
        success: true,
        data: createuser,
        message: "user login id created succefully",
      });
    }
  } catch (e) {
    return res.status(300).json({
      success: false,
      message: "failed to create userlogin",
    });
  }
});

App.get("/api/data", async (req, res) => {
  try {
    const users = await usermodel.find();
     res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

App.get("/", (req, res) => {
  return res.json({
    message: "server is live",
  });
});

App.listen(9000, () => {
  console.log("server is started");
});
