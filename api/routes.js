const bookRoutes = require('./api/book/book.routes');
const registRoutes = require('./api/register/register.routes');
const authRoutes = require('./api/auth/auth.routes');

function registerRoutes(app) {
    app.use('/api', bookRoutes);
    app.use('/api', registRoutes);
    app.use('/api', authRoutes);
}

module.exports = {
    registerRoutes: registerRoutes
};