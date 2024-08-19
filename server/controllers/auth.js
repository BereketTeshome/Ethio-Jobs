const User = require("../models/User");

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Please provide username and password" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "Invalid username or password!" });
  }
  const compare = await user.comparePassword(password);
  if (!compare) {
    return res.json({ error: "Incorrect password!" });
  }
  try {
    const token = user.createToken();
    res.status(201).json({ user, token: token });
  } catch (err) {
    res.status(500).json(err);
  }
};

const Register = async (req, res) => {
  const { username, email, password, confirmPassword, isAdmin } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
    isAdmin,
  });
  try {
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findByIdAndDelete({ _id: id });
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { Register, Login, getUsers, updateUser, deleteUser };
