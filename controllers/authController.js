// // Подключаем нужные модули
// const User = require('../models/User'); // модель пользователя
// const bcrypt = require('bcryptjs'); // для сравнения паролей
// const generateToken = require('../utils/generateToken'); // функция создания токена

// // Функция для логина
// // req - запрос от фронтенда (содержит email и пароль)
// // res - ответ, который мы отправим обратно
// const loginUser = async (req, res) => {
//   try {
//     // 1. Получаем email и пароль из запроса
//     const { email, password } = req.body;

//     // 2. Проверяем, что они вообще пришли
//     if (!email || !password) {
//       return res.status(400).json({
//         message: 'Please provide email and password',
//       });
//     }

//     // 3. Ищем пользователя в базе по email
//     const user = await User.findOne({ email });

//     // 4. Если пользователь не найден
//     if (!user) {
//       return res.status(401).json({
//         message: 'Invalid email or password',
//       });
//     }

//     // 5. Сравниваем пароль из запроса с паролем в базе
//     // user.password - зашифрованный пароль из базы
//     // bcrypt.compare - проверяет, подходит ли введенный пароль
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     // 6. Если пароль не совпадает
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         message: 'Invalid email or password',
//       });
//     }

//     // 7. ВСЕ ХОРОШО! Создаем токен
//     const token = generateToken(user._id);

//     // 8. Отправляем ответ с данными пользователя и токеном
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: token, // клиент сохранит этот токен
//     });
//   } catch (error) {
//     // Если что-то пошло не так
//     console.log(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Функция для получения информации о пользователе
// const getUserProfile = async (req, res) => {
//   try {
//     // req.user - мы получим это из middleware (следующий файл)
//     const user = req.user;

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Экспортируем функции, чтобы использовать в других файлах
// module.exports = {
//   loginUser,
//   getUserProfile,
// };
