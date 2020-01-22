module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, },
    gameId: { type: String, required: true, },
    url: { type: String, required: false, },
    releaseDate: { type: Date, required: false, default: Date.now() },
    // price: mongoose.Schema.Prices,
    // priceWithDiscount: mongoose.Schema.Prices,
    // priceHistory: [ mongoose.Schema.Prices ],
    discountPercent: { type: Number, required: false, default: 0, },
  });
};
