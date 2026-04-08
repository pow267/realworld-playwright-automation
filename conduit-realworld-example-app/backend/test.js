require('dotenv').config({path: '../.env'});
const { sequelize } = require('./models');
sequelize.query(`SELECT count(*) FROM "Tags"`).then(rows => console.log(rows[0])).catch(console.error);
