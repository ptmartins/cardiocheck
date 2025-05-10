import express from 'express';
import Readings from '../models/readings.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const readings = await Readings.find().lean();
    res.json(readings);
})

export default router;