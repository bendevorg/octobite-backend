module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, },
  });
};
