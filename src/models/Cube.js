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
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
