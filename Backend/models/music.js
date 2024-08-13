import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    }, 
}, { timestamps: true
});

const Music = mongoose.model('Music', musicSchema);
export default Music