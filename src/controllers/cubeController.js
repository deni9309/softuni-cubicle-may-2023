const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/');
});

router.get('/:cubeId/details', (req, res) => {
    const cube = cubeService.getOne(req.params.cubeId);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
});

module.exports = router;