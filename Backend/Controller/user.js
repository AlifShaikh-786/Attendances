import bcryptjs from "bcrypt";
import User from "../Model/user.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: false, // Set true in production with HTTPS
  sameSite: "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export async function loginThroughGmail(req, res) {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();

//     const { sub, email, name, picture } = payload;
//     let userExist = await User.findOne({ email });
//     if (!userExist) {
//       userExist = await User.create({
//         googleId: sub,
//         email,
//         f_name: name,
//         profile_pic: picture,
//       });
//     }

//     const jwttoken = jwt.sign(
//       { userId: userExist._id },
//       process.env.JWT_PRIVATE_KEY
//     );
//     res.cookie("token", jwttoken, cookieOptions);

//     return res.status(200).json({ user: userExist });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// }

export async function register(req, res) {
  try {
    const { email, password, f_name } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        error:
          "Already have an account with this email. Please try with another email",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, f_name });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: "yes",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      userExist.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { userId: userExist._id },
      process.env.JWT_PRIVATE_KEY
    );
    res.cookie("token", token, cookieOptions);

    return res.json({
      message: "Logged in successfully",
      success: "true",
      user: userExist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
}

export const logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "LOgged Out Sucessfully " });
};
