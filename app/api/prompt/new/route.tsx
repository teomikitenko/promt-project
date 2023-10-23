import { connectToDB } from "@configs/database";
import Prompt from '@models/prompt'

export async function POST(request:Request){
 const {userID,prompt,tag}= await request.json()

try{
    await connectToDB();
    const newPrompt=new Prompt({
        creator:userID,
        prompt,
        tag
    })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt),{status:201})
}catch(e){
return new Response('Faied response',{status:500})
}    
}

 