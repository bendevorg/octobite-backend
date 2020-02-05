module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, unique: true, required: true, },
    description: { type: String, required: false, },
    image: { type: String, required: false, default: '', },
    lowResImage: { type: String, required: false, default: '', },
    categories: [ mongoose.Schema.Categories ],
    platforms: [ mongoose.Schema.Platforms ],
    enabled: { type: Boolean, required: false, default: true, },
  });
};
