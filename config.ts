const config = {
    // config options:
    env: process.env.ENV || 'development',
    port: 3000,

    // constants:
    facebook: {
        clientID: '************',
        clientSecret: '************'
    },
    jwt: {
        secret: "***********",
        session: {
            session: false
        }
    }
};

export {config};