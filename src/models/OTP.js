import mongoose from 'mongoose';

const OTPschema = new mongoose.Schema({
    otp:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"]
    },
    verified:{
        type: Boolean,
        default: false
    },

},{
    timestamps: true
});

export default mongoose.model('OTP', OTPschema);