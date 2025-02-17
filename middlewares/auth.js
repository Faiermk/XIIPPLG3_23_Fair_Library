const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;