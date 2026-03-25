const express = require('express');
const router = express.Router();

const { register, login, getUserInfo, logout } = require('../controllers/auth');

const { validateBody, authenticate } = require('../middlewares');

const { registerSchema, loginSchema } = require('../models/User');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/user-info', authenticate, getUserInfo);
router.get('/logout', authenticate, logout);

module.exports = router;
