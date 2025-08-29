const express = require('express');

// Import des routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

// Import du middleware d'erreur
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/api/users', userRoutes);

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Route 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

module.exports = app;