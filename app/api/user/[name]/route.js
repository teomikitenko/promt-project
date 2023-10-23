import { connectToDB } from "@configs/database";
import Prompt from '@models/prompt'
import User from '../../../../models/user'

export async function GET(req,{params}){
try{
    await connectToDB();
    const user=await User.find({username:params.name})
    console.log(User)
    return new Response(JSON.stringify(user),{status:200})
}catch(e){
    return new Response("Failed to fetch",{status:500}) 
}

}