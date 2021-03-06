var express = require('express');
var router = express.Router();
const models = require('../models')
const Op = require('sequelize').Op;

/* POST users listing. */
router.post('/:lecture', async (req, res, next) => {
  const query = req.params.lecture.replace(' ', '');
  if (query === undefined || query.length < 2)
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
