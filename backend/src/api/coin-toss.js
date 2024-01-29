import User from '../models/user.js';

const coinToss = async (req, res) => {
  const { userId, wager, choice } = req.body;

  try {
    const existingUser = await User.findById({ userId });

    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' });
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default coinToss;
