const { Sequelize } = require('sequelize');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: {
            options: {
                encrypt: true,
            },
        }
    }
);