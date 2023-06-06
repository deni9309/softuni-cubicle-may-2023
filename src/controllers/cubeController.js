const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('cube/create', {
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
        owner: req.user._id
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeService.getOneWithAccessories(req.params.cubeId).lean();

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
    const accessories = await accessoryService.getAvailableForAttach(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', {
        title: 'Attach Accessory',
        cube,
        accessories,
        hasAccessories,
    });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});

module.exports = router;
