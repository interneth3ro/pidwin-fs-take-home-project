import User from '../models/user.js';

const coinToss = async (req, res) => {
  const { userId, wager, choice, currentStreak } = req.body;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User Does Not Exist' });
    }

    const tossResult = Math.random() >= 0.5 ? 'heads' : 'tails';
    let streak = currentStreak;
    // assume loss at first as it's easier
    let result = {
      flipResult: tossResult,
      isWin: false,
      payout: 0,
      currentStreak: 0,
      currentBalance: existingUser.tokens - wager,
    };

    if (tossResult === choice) {
      let payoutMultiplier = 2;
      let payout;
      streak++;

      // Reset streak if current streak is 6 or more
      if (streak >= 6) {
        streak = 1;
      }

      if (streak === 3) {
        payoutMultiplier = 3;
      } else if (streak === 5) {
        payoutMultiplier = 10;
      }

      payout = wager * payoutMultiplier;

      result.isWin = true;
      result.payout = wager * payoutMultiplier;
      result.currentStreak = streak;
      result.currentBalance = existingUser.tokens + payout;
    }

    existingUser.tokens = result.currentBalance;
    existingUser.save();

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default coinToss;
