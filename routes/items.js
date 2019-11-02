var express = require('express');
var router = express.Router();
const models = require('../models')
const Op = require('sequelize').Op;

/* GET users listing. */
router.get('/:lecture', async (req, res, next) => {
  const query = req.params.lecture.replace(' ', '');
  if (query === undefined || query.length < 3)
    res.json({})
  else {
    const Item = models.Item

    const ret = await Item.findAll({
      where: {
        [Op.or]: {
          lecture: {
            [Op.like]: `%${query}%`
          },
          code: {
            [Op.like]: `%${query}%`
          },
          professor: {
            [Op.like]: `%${query}%`
          }
        }
      },
      order: [
        ['lecture', 'ASC']
      ]
    })
      .then(res => res)
    res.json(ret)
  }

});

module.exports = router;
