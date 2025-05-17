import express from 'express';
import Readings from '../models/readings.model.js';

const router = express.Router();

// All Readings
router.get('/', async (req, res) => {
    try {
        const readings = await Readings.find().lean();
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
         title: 'Add new reading',
         reading: new Readings(),
        }
    );
});

// Create Reading
router.post('/', async (req, res) => {
    const reading = new Readings({
        sys: req.body.sys,
        dia: req.body.dia,
        bpm: req.body.bpm,
        dateTime: new Date(req.body.date)
    });

    try {
        const newReading = await reading.save();
        res.redirect('readings/');
    } catch (err) {
        res.status(400).json({
            error: true,
            errorMessage: 'Error adding reading. Please try again'
        })
    }
});

export default router;