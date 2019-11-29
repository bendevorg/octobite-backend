module.exports = mongoose => {
  return new mongoose.Schema({
    game: mongoose.Schema.games,
  });
};
