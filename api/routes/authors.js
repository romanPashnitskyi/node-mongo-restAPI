const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'Authors were fetched'
    });
});

router.post('/', (req, res, next) => {
    const author = {
        id: req.body.id,
        name: req.body.name
    };
    res.status(201).json({
        message:'Author was created',
        author: author
    });
});

router.get('/:authorId', (req, res, next) => {
    res.status(200).json({
        message: 'Author information',
        authorId: req.params.authorId
    });
});

router.delete('/:authorId', (req, res, next) => {
    res.status(200).json({
        message: 'Author deleted',
        authorId: req.params.authorId
    });
});

module.exports = router;
