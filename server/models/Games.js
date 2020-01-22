module.exports = mongoose => {
  return new mongoose.Schema(
    {
      _id: Number,
      wishlist: [String],
    },
    { _id: false }
  );
};
