import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"]
    }
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);