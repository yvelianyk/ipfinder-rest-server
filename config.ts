import * as path from 'path';

const config = {
    // config options:
    env: process.env.ENV || 'development',
    port: 3000,

    // constants:
    //MONGO_DB_URL: 'mongodb://localhost/mydb',
    //CLIENT_APP_DIR: path.join(__dirname, '../../client')
};

export { config };