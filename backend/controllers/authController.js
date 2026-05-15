const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  console.log("controller start execution");

  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    console.log("Incoming Data:", {
      fullName,
      email,
      password,
    });

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check existing user
    console.log("checking existing user...");

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    console.log("existing user result:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use.",
      });
    }

    // Create new user
    console.log("creating user...");

    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password,
      profileImageUrl: profileImageUrl || "",
    });

    // Save user
    const savedUser = await user.save();

    console.log("user created successfully");

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(savedUser._id),
      user: {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profileImageUrl: savedUser.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user.", error: err.message });
  }
};
