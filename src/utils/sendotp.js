import mailer from "../config/mailer.js";

//6 digit otp generator
const OTPgenerator = () =>{
   return Math.floor(100000 + Math.random() * 90000).toString();
}

const OTPmailer = async(email)=>{
    const otp= OTPgenerator();
    const sub ="your otp code";
    const text =`Your otp is ${otp} share it if u wanna share lol`;

    try{
        await mailer(email,sub,text);
        return otp;
    }catch(err){
        console.log("mailer error otp not sent", err.message);
    }
};

export default OTPmailer;
