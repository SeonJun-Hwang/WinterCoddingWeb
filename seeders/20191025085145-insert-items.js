'use strict';

const loader = require('csv-load-sync')
const path = require('path')

module.exports = {
  up: (queryInterface, Sequelize) => {

    const datas = loader(path.join(__dirname, 'courses.csv'))
    for(let data of datas)
      data.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

    return queryInterface.bulkInsert('Items', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
