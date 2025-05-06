import express from 'express';

const router = express.Router();

// All Readings
router.get('/', (req, res) => {
    res.render('readings/index', { title: 'All Readings' });
});

// New Reading
router.get('/new', (req, res) => {
    res.render('readings/new', { title: 'New Reading' });
});

// Create Reading
router.post('/', (req, res) => {
    res.send('Creating Reading');
});

export default router;