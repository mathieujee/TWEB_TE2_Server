const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://user:HG00jE9RSWsyrnQC@cluster0-xwcjv.mongodb.net/test?retryWrites=true';

const options = {
    useNewUrlParser: true,
    dbName: 'TWEB_TE2',
};

mongoose.connect(dbURI, options);

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel, ObjectId }