import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registration = async (req, res) => {
  try {
    const passwordHash = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwordHash, salt);

    const user = await User.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    const token = jwt.sign(
      {
        id: user.id,
      },
      '001',
      {
        expiresIn: '30d',
      },
    );
    const { password, ...userData } = user.dataValues;
    res.status(201).json({ ...userData, token });
  } catch (err) {
    res.status(500).json({ message: 'Не удалось зарегистрироваться!' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден.',
      });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPass) {
      return res.status(404).json({
        message: 'Неверный логин или пароль.',
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      '001',
      {
        expiresIn: '30d',
      },
    );
    const { password, ...userData } = user.dataValues;
    res.status(201).json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться.',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const { password, ...userData } = user.dataValues;
    res.json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export { registration, login, getMe };
