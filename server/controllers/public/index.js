import express from "express";
import userModel from "../../models/Users.js";
import jwt from "jsonwebtoken"
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    let { fullName, email, password, phone } = userData;
    // if (!email || !password || !phone || fullName) {
    //   return res.status(400).json({ msg: "all fields required" });
    // }
    let emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ msg: "email already exists" });
    }
    let userCount = await userModel.countDocuments();
    userData.userId = userCount + 1;
    await userModel.create(userData);
    return res.status(200).json({ msg: "user registered succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // if (!email || password) {
    //   return res.status(400).json({ msg: "email and password required" });
    // }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "no user found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "incorrect password" });
    }

    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      "secret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ msg: "login successfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
