const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./config/db');
const questionRoutes = require('./routes/question.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/quiz', questionRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'No route found' });
});

// Central error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server only after DB connects
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server started on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect DB:', err);
        process.exit(1);
    });
