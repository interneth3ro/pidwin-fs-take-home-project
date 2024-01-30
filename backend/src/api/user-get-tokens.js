import User from '../models/user.js';

const getUserTokens = async (req, res) => {
  const userId = req.userId;

  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' });
    }

    res
      .status(200)
      .json({ currentStreak: 0, currentBalance: existingUser.tokens });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default getUserTokens;
