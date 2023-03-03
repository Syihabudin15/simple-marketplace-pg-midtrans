import { Sequelize, DataTypes } from "sequelize";

const DB = new Sequelize('test_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export { DB, DataTypes };