// Données en mémoire (simples et temporaires)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    try {
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Créer un nouvel utilisateur
exports.createUser = (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Validation simple
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Le nom et l\'email sont requis'
            });
        }

        // Créer le nouvel utilisateur
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email
        };

        users.push(newUser);

        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        // Mettre à jour l'utilisateur
        users[userIndex] = { ...users[userIndex], ...req.body };

        res.json({
            success: true,
            data: users[userIndex]
        });
    } catch (error) {
        next(error);
    }
};

// Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        // Supprimer l'utilisateur
        const deletedUser = users.splice(userIndex, 1)[0];

        res.json({
            success: true,
            message: 'Utilisateur supprimé avec succès',
            data: deletedUser
        });
    } catch (error) {
        next(error);
    }
};