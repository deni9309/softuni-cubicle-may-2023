const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;