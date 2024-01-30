import User from '../models/user.js';

const coinToss = async (req, res) => {
  const { userId, wager, choice } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' });
    }

    let isWin;
    const rand = Math.floor(Math.random() * 100 + 1);
    const isEven = rand % 2 === 0;
    // heads is even, tails is odd
    if (choice === 'heads' && isEven) {
      isWin = true;
    } else if (choice === 'tails' && !isEven) {
      isWin = true;
    } else {
      isWin = false;
    }

    res.status(200).json({ result: isWin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default coinToss;
