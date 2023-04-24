import { User } from '../models/User.js';

export default async (req, res, next) => {
  try {
    const findUser = await User.findOne({ where: { role: 'admin' } });
    if (req.userId === findUser.dataValues.id) {
      next();
    } else {
      return res.status(403).json({
        message: 'Вы не администратор',
      });
    }
  } catch (err) {
    res.status(500).json(console.error(err));
  }
};
