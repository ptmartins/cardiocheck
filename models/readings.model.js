import mongoose from "mongoose";

const readingsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
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

// readingsSchema.method("toJSON", async function() {
//     console.log("toJSON called");
//     const { __v, _id, ...object } = await this.toObject({getters: true});
//     object.id = String(_id);
//     return object;
// });

export default mongoose.model('Readings', readingsSchema);