module.exports = mongoose => {
  return new mongoose.Schema({
    value: { type: Number, required: true, default: 0, },
    country: { type: String, required: false, default: 'US', },
    date: { type: Date, required: false, default: Date.now() },
  });
};
