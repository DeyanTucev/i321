const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur mon API Express',
        version: '1.0.0',
        endpoints: {
            users: '/api/users'
        }
    });
});

module.exports = router;