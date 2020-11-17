const updateDatabase = require('../../../utils/updateDatabase');
const findDatabase = require('../../../utils/findDatabase');
const constants = require('../../../utils/constants');
const { InvalidPlatformId } = require('../../../utils/errors');

module.exports = async (req, res, next) => {
  const { id } = req.body;
  let { platformIds } = req.body;

  let games;
  let user;
  try {
    user = await findDatabase(
      constants.tables.USERS,
      { _id: req.user._id },
      constants.selections.USER_WITH_WISHLIST,
      {},
      0,
      1
    );
  } catch (err) {
    return next(err);
  }
  try {
    games = await findDatabase(constants.tables.GAMES, { _id: id }, [], {}, 0, 1);
  } catch (err) {
    return next(err);
  }
  const game = user.wishlist.find(wish => wish.id === id);
  if (!game) {
    return res.status(200).json({ data: user });
  }

  if (typeof platformIds === 'string') {
    platformIds = [platformIds];
  }

  platformIds.forEach(platformId => {
    const validPlatform = games.platforms.find(
      platform => platform.gameId === platformId
    );
    if (!validPlatform) {
      return next(new InvalidPlatformId());
    }
    const platform = game.platformIds.findIndex(
      platId => platId === platformId
    );
    if (platform === -1) {
      return res.status(200).json({ data: user });
    }
    game.platformIds.splice(platform, 1);
  });
  if (game.platformIds.length === 0) {
    const gameIndex = user.wishlist.findIndex(wish => wish.id === id);
    user.wishlist.splice(gameIndex, 1);
  }
  let newUser;
  try {
    newUser = await updateDatabase(constants.tables.USERS, user._id, user);
  } catch (err) {
    return next(err);
  }
  return res.status(200).json({ data: newUser });
};
