const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');

router.get('/create', (req, res) => {
    res.render('cube/create', { title: 'Create Cube' });
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

    res.render('cube/details', { title: 'Cube Details', cube });
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

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/edit', { title: 'Edit Cube', cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
    const cubeId = req.params.cubeId;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeService.update(cubeId, {
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });

    res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/delete', { title: 'Delete Cube', cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});

module.exports = router;
