import express from 'express';
import Readings from '../models/readings.model.js';

const router = express.Router();

// All Readings
router.get('/', async (req, res) => {
    try {
        const readings = await Readings.find();
        res.render('readings/index', {
            title: 'All Readings',
            readings: readings,
        });
    } catch(err) {
        res.redirect('/');
    }
});

// New Reading
router.get('/new', (req, res) => {
    res.render('readings/new', {
         title: 'New Reading',
         reading: new Readings(),
        }
    );
});

// Create Reading
router.post('/', async (req, res) => {
    const reading = new Readings({
        sys: req.body.sys,
        dia: req.body.dia,
        bpm: req.body.bpm
    });

    try {
        const newReading = await reading.save();
        console.log('Reading saved:', newReading);
        res.redirect('readings/');
    } catch (err) {
        console.error('Error saving reading:', err);
        res.render('readings/new', {
            title: 'New Reading',
            error: true,
            errorMessage: 'Error adding reading. Please try again.',
        });
    }
});

export default router;