import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    platform: {
        type: String
    }, 
    url: {
        type: String
    },
    date: {
        type: Date
    },
    isPast: {
        type: Boolean
    }
});

const Contest = mongoose.model('Contest', contestSchema);
export default Contest;