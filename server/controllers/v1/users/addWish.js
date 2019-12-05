const updateDatabase = require('../../../utils/updateDatabase');
const constants = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  const { id, platformId } = req.body;
  const { user } = req;
  const game = user.wishlist.find(wish => wish.id === id);
  if (game) {
    game.platformIds.push(platformId);
  } else {
    console.log(0);
    user.wishlist.push({ id, platformId });
  }
  let newUser;
  try {
    newUser = await updateDatabase(constants.tables.USERS, user._id, user);
  } catch (err) {
    return next(err);
  }
  return res.status(200).json({ data: newUser });
};
