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
            title: 'Dashboard',
            dashSys: sysAvg !== 0 ? sysAvg.toFixed(1) : '-',
            dashDia: diaAvg !== 0 ? diaAvg.toFixed(1) : '-',
            dashBpm: bpmAvg !== 0 ? bpmAvg.toFixed(1) : '-',
            hasReadings: readings[readings.length - 1] !== undefined,
            date: readings[readings.length - 1] !== undefined ? new Date(readings[readings.length - 1].date).toLocaleString() : '-',
            sys: readings[readings.length - 1] !== undefined ? readings[readings.length - 1].sys : '-',
            dia: readings[readings.length - 1] !== undefined ? readings[readings.length - 1].dia : '-',
            bpm: readings[readings.length - 1] !== undefined ? readings[readings.length - 1].bpm : '-'
        });
    } catch (err) {
        console.log(err);
    }
});

export default router;   
