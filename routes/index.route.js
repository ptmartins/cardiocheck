import express from 'express';
import Readings from '../models/readings.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const readings = await Readings.find();

        let sys = 0;
        let dia = 0;
        let bpm = 0;
        let sysAvg = 0;
        let diaAvg = 0;
        let bpmAvg = 0;

        readings.forEach((reading) => {
            sys += reading.sys;
            dia += reading.dia;
            bpm += reading.bpm;

            sysAvg = sys / readings.length;
            diaAvg = dia / readings.length;
            bpmAvg =  bpm / readings.length;
        });

        res.render('index', {
            sys: sysAvg.toFixed(1),
            dia: diaAvg.toFixed(1),
            bpm: bpmAvg.toFixed(1),
        });
    } catch (err) {

    }
});

export default router;