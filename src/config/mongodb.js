import mongoose from "mongoose";

const connection= async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI,{

        
        });
        console.log("connected to mongodb");
    }catch(err){
        console.log("not connected:",err.messgage);
    }
};

export default connection;