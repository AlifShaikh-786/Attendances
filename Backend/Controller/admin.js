const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/user");
const bcryptjs = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const NotificationModel = require("../models/notification");

// const cookieOptions = {
//   httpOnly: true,
//   secure: false, //See to true in production
//   sameSite: "Lax", //Set none in Production
// };

const cookieOptions = {
  httpOnly: true, // Prevents client-side JS from accessing the cookie
  secure: false, // Use true in production with HTTPS
  sameSite: "Lax", // Prevents CSRF (use "None" if cross-domain and HTTPS)
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginThroughGmail = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;
    let userExist = await User.findOne({ email });
    if (!userExist) {
      //Register New User
      userExist = await User.create({
        googleId: sub,
        email,
        f_name: name,
        profile_pic: picture,
      });
    }

    let jwttoken = jwt.sign(
      { userId: userExist._id },
      process.env.JWT_PRIVATE_KEY
    );
    res.cookie("token", jwttoken, cookieOptions);

    return res.status(200).json({ user: userExist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    // console.log(req.body);
    let { email, password, f_name } = req.body;
    let isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400).json({
        error:
          "Already have an account with this email . Please try with other email",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, f_name });
    await newUser.save();

    return res.status(201).json({
      message: "User registered sucessfully",
      sucess: "yes",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      const isPasswordValid = await bcryptjs.compare(
        password,
        userExist.password
      );
      console.log(isPasswordValid);
      let token = jwt.sign(
        { userId: userExist._id },
        process.env.JWT_PRIVATE_KEY
      );
      res.cookie("token", token, cookieOptions);
      // console.log(res);
      return res.json({
        message: "Logged in sucessfully",
        sucess: "true",
        userExist,
      });
    } else {
      res.status(400).json({
        error: "Invalid Credentials. ",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    //Check User Exist
    const isExist = await User.findById(req.user._id);
    if (!isExist) {
      return res.status(400).json({ error: "User Dosent Exist" });
    }

    //Update User and return updated Document
    const updateData = await User.findByIdAndUpdate(isExist._id, user);

    const userData = await User.findById(req.user._id);
    res.status(200).json({
      message: "User updated Sucessfully",
      user: userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "LOgged Out Sucessfully " });
};

// exports.findUser = async (req, res) => {
//   try {
//     let { query } = req.query;
//     console.log(query);
//     const users = await User.find({
//       $and: [
//         { _id: { $ne: req.user._id } },
//         {
//           $or: [
//             { name: { $regex: new RegExp(`^${query}`, "i") } },
//             { email: { $regex: new RegExp(`^${query}`, "i") } },
//           ],
//         },
//       ],
//     });

//     return res.status(201).json({
//       message: "fetched Data",
//       users: users,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// };

