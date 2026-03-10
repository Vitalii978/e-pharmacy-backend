// controllers/test.js
const test = (req, res) => {
  res.json({ message: 'Контроллер работает!' });
};

module.exports = { test };
