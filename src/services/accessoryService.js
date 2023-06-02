const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();

exports.create = (accessoryData) => Accessory.create(accessoryData);

// using native mongodb query
exports.getAvailableForAttach = (accessoryIdsToExclude) => Accessory.find({ _id: { $nin: accessoryIdsToExclude } });


