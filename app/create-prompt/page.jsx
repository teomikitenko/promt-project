"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useSession } from "next-auth/react"
import Form from "@components/Form"
const CreatePrompt = () => {
    const router=useRouter()
    const { data: session } = useSession();
    const [submitting, setsubmittimg] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    })
    const createPrompt=async(e/* FormEvent<HTMLFormElement> */)=>{
    e.preventDefault()
    setsubmittimg(true)
    try{
const response=await fetch('api/prompt/new',{
    method:'POST',
    body:JSON.stringify({
        prompt:post.prompt,
        userID:session?.user?.id,
        tag:post.tag
    })
    
})
if(response.ok)router.push('/')
    }catch(e){
  console.log(e)
    }finally{
        setsubmittimg(false)
    }
    }
  return (
    <Form
       type="Create"
       post={post}
       setPost={setPost}
       submitting={submitting}
       handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt