/* Express Router */
const express = require('express');

const router = express.Router();

router.route('/').get(async (req, res) => {
    console.log(req.params)
    res.render('base.ejs',{title:'abed'});
});

module.exports = router;
