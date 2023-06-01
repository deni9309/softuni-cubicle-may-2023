const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: {
        type: [Types.ObjectId],
        ref: 'Accessory',
        default: [],
    },
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;