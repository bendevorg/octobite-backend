module.exports = mongoose => {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      unique: true,
      required: true,
    },
    valor: {
      type: Number,
      required: false,
      default: 0,
    },
  });
};
