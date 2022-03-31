const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom:{
        type: Schema.Tyeps.ObjectId,
        ref: 'User'
    },
    movieId: {
        type : String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRuntime: {
        type: String
    }
    
},{timestamps : true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {Favorite}