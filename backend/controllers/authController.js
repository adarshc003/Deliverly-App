const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
      employeeId,
      accessKey,
    } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // delivery validation
    if (role === "delivery") {

      if (!employeeId) {
        return res.status(400).json({
          message: "Employee ID is required",
        });
      }

      if (
        accessKey !== process.env.DELIVERY_ACCESS_KEY
      ) {
        return res.status(400).json({
          message: "Invalid delivery access key",
        });
      }

    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      employeeId: role === "delivery"
        ? employeeId
        : null,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

res.status(200).json({

  token,

  user: {

    id: user._id,

    name: user.name,

    email: user.email,

    role: user.role,

  },

});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GOOGLE AUTH
const googleAuth = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
    } = req.body;

    let user =
      await User.findOne({
        email,
      });

    // AUTO REGISTER

    if (!user) {

      const randomPassword =
        Math.random()
          .toString(36)
          .slice(-8);

      const hashedPassword =
        await bcrypt.hash(
          randomPassword,
          10
        );

      user =
        await User.create({

          name,
          email,
          password:
            hashedPassword,

          role: "customer",

        });

    }

    // JWT TOKEN

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
};