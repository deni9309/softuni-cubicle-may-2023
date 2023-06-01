const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube'
    });
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', {
        title: 'Details',
        cube,
    });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    const accessories = await accessoryService.getAll().lean();

    res.render('accessory/attach', {
        title: 'Attach Accessory',
        cube,
        accessories,
    });
});

module.exports = router;