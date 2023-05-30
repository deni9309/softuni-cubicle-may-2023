const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create', {title:'Create Cube'});
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

    res.render('details', { cube });
});

module.exports = router;