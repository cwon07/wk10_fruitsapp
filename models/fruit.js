const mongoose = require('./connection');

// schema which will go into model
const fruitSchema = new mongoose.Schema({
    name: String,
    color: String, 
    readyToEat: Boolean,
    username: String,
});

// fruit model
const Fruit = mongoose.model('fruit', fruitSchema);

module.exports = Fruit;