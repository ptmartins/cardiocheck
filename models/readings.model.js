import mongoose from "mongoose";

const readingsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    sys: {
        type: Number,
        required: true
    },
    dia: {
        type: Number,
        required: true
    },
    bpm: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Readings', readingsSchema);