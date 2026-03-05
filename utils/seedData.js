const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Connected to MongoDB for seeding...');

    // Удаляем существующего пользователя
    await User.deleteMany({ email: 'vendor@gmail.com' });

    // Создаем нового с правильным хешем пароля
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await User.create({
      name: 'Clayton Santos',
      email: 'vendor@gmail.com',
      password: hashedPassword,
    });

    console.log('✅ Test user created:');
    console.log({
      name: user.name,
      email: user.email,
      password: 'password123',
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
