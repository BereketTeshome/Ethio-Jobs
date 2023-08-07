const express = require('express');
const { Register, Login, getUsers, deleteUser, updateUser } = require('../controllers/auth');
const router = express.Router();


router.post("/register", Register)
router.post("/login", Login)
router.get("/users", getUsers)
router.put("/edit/:id", updateUser)
router.delete("/delete/:id", deleteUser)



module.exports = router