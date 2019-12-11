const updateDatabase = require('../../../utils/updateDatabase');
const findDatabase = require('../../../utils/findDatabase');
const constants = require('../../../utils/constants');
const { InvalidPlatformId } = require('../../../utils/errors');

module.exports = async (req, res, next) => {
  const { id, platformId } = req.body;
  const { user } = req;

  let games;

  try {
    games = await findDatabase(constants.tables.GAMES, { _id: id }, 0, 1);
  } catch (err) {
    return next(err);
  }
  const validPlatform = games.platforms.find(
    platform => platform.gameId === platformId
  );
  if (!validPlatform) {
    return next(new InvalidPlatformId());
  }
  let game = user.wishlist.find(wish => wish.id === id);
  if (!game) {
    user.wishlist.push({ id });
    game = user.wishlist[user.wishlist.length - 1];
  }
  const platform = game.platformIds.find(platId => platId === platformId);
  if (!platform) {
    game.platformIds.push(platformId);
  }
  let newUser;
  try {
    newUser = await updateDatabase(constants.tables.USERS, user._id, user);
  } catch (err) {
    return next(err);
  }
  return res.status(200).json({ data: newUser });
};
