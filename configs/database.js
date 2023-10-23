import mongoose from "mongoose";

let isConnected=false;
const uri ='mongodb+srv://jenmikitenko:jenmikiteno7777@cluster0.4vtkvai.mongodb.net/?retryWrites=true&w=majority'
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect(uri,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })
        isConnected=true
        console.log('MongoDB connected')
        
    } catch (error) {
        console.log(error)
    }
}