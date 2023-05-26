const uniqid = require('uniqid');

const cubes = [
    {
        id: '4n5pxq24kpiob12og9',
        name: 'Classic Rubik Cube',
        description: 'There is nothing better than classics! Buy this Rubik Cube Now!',
        imageUrl: "https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg",
        difficultyLevel: 3
    },
    {
        id: '6t5pxq24kpids12og0',
        name: 'Dark Modern Rubik Cube',
        description: 'Cool and hard to solve! Buy this Rubik Cube Now!',
        imageUrl: "https://i.pinimg.com/originals/d3/38/72/d33872e02a78fe191fcfd49ced3ce7cd.png",
        difficultyLevel: 5
    }
];

exports.getAll = (search, from, to) => {
    let cubesData = cubes.slice();  // It's a good practice to return a new reference of the cubes arr 'slice()' makes a shallow copy of it

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

exports.getOne = (cubeId) => cubes.find(c => c.id == cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData
    };

    cubes.push(newCube);

    return newCube;
};