const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;