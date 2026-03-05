const express = require('express');
const router = express.Router();
const { loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// По адресу /api/user/login вызываем функцию loginUser
router.post('/login', loginUser);

// По адресу /api/user/user-info
// Сначала проверяем токен (protect), потом вызываем getUserProfile
router.get('/user-info', protect, getUserProfile);
router.get('/logout', protect, logoutUser);

module.exports = router;
