// Подключаем mongoose - это библиотека для общения с MongoDB
const mongoose = require('mongoose');

// Создаем описание (схему) пользователя
// Это как форма для заполнения
const userSchema = new mongoose.Schema({
  // Поле email: какое оно?
  email: {
    type: String, // тип данных - строка
    required: true, // обязательно для заполнения
    unique: true, // не может быть двух одинаковых email
    lowercase: true, // автоматически в нижний регистр
  },
  // Поле password
  password: {
    type: String,
    required: true,
  },
  // Имя пользователя
  name: {
    type: String,
    required: true,
  },
});

// Создаем модель на основе схемы
// Модель - это инструмент, через который мы будем работать с пользователями
module.exports = mongoose.model('User', userSchema);

// Подробное объяснение:

// Код	Что делает
// new mongoose.Schema({...})	Создает схему (структуру) документа в MongoDB
// type: String	Поле будет строкой
// required: [true, '...']	Поле обязательно, если нет - ошибка с текстом
// unique: true	Email должен быть уникальным (не может быть двух пользователей с одинаковым email)
// lowercase: true	Автоматически преобразует email в нижний регистр
// trim: true	Удаляет пробелы в начале и конце
// minlength: 6	Минимальная длина пароля - 6 символов
// timestamps: true	Добавляет поля createdAt и updatedAt автоматически
// mongoose.model('User', userSchema)	Создает модель для работы с коллекцией "users"
