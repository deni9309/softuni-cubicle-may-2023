const Cube = require('../models/Cube');

exports.getAll = async (search, from, to) => {

    let cubesData = await Cube.find().lean(); // lean() will transform data in plain object; works only on queries

    if (search) {
        cubesData = cubesData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (from) {
        cubesData = cubesData.filter(c => c.difficultyLevel >= Number(from));
    }
    if (to) {
        cubesData = cubesData.filter(c => c.difficultyLevel <= Number(to));
    }

    return cubesData;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneWithAccessories = (cubeId) => this.getOne(cubeId).populate('accessories');

exports.create = async (cubeData) => {
    const newCube = new Cube(cubeData);

    await newCube.save();

    return newCube;
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);

exports.attachAccessory = async (cubeId, accessoryId) => {
    // using native mongodb update query
    // return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });

    const cube = await Cube.findById(cubeId);
    cube.accessories.push(accessoryId);

    return cube.save();
};
