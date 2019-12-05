module.exports = mongoose => {
  return new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    platformIds: {
      type: [String],
      required: true,
    },
  });
};
