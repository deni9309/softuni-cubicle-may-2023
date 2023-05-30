const router = require('express').Router();

router.get('/create', (req, res) => {

    res.render('accessory/create', { title: 'Create Accessory' });
});

module.exports = router;