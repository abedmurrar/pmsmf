const apisRouter = require('./api');
const authRouter = require('./auth');
const middleware = require('./middleware');
const viewsRouter = require('./views');

module.exports = {
    apisRouter,
    authRouter,
    middleware,
    viewsRouter
};
