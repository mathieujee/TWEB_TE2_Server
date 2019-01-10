const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://user:XanPKU2Kj5ihE01f@cluster0-xwcjv.mongodb.net/test?retryWrites=true';

const options = {
  useNewUrlParser: true,
  dbName: 'movie-time',
};

mongoose.connect(dbURI, options);

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchlist: { type: Array, required: false },
});

const movieSchema = new mongoose.Schema({
  vote_count: { type: Number, required: false },
  video: { type: Boolean, required: false },
  vote_average: { type: Number, required: false },
  title: { type: String, required: true },
  popularity: { type: Number, required: false },
  poster_path: { type: String, required: false },
  original_language: { type: String, required: false },
  original_title: { type: String, required: false },
  backdrop_path: { type: String, required: false },
  adult: { type: Boolean, required: false },
  overview: { type: String, required: false },
  release_date: { type: String, required: false },
  tmdb_id: { type: Number, required: true },
  genres: { type: Array, required: false },
});

const UserModel = mongoose.model('user', userSchema);
const MovieModel = mongoose.model('movie', movieSchema);

module.exports = { UserModel, ObjectId, MovieModel };
