"use client"
import { useState } from "react"
import Image from "next/image"
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { usePathname,useRouter } from "next/navigation"

/* type Post={
  tag:string
  prompt:string
  creator:{
    username:string,
    email:string,
    image:string
    }}
type Card={
post:Post
handleTagClick:()=>void,
handleEdit:()=>void,
handleDelete:()=>void
} */
const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}/* :Card */) => {
  const [copied, setCopied] = useState('')
  const{data:session}=useSession()
  const pathname=usePathname()
  const router = useRouter()
  const handleCopy=()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(""),3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-52">
        <div className="flex-1 felx justify-start items-center gap-3 cursor-pointer">
          <Image
          src={post.creator.image}
          width={40}
          height={40}
          className="rounded-full object-contain"
          alt="creator"
          />
          <div className="flex flex-col">
           <Link href={`/user-profile?name=${post.creator.username}&id=${post._id}`} ><h3 className="font-satoshi font-semibold text-gray-900" >{post.creator.username}</h3></Link> 
            <p className="font-inter text-sm text-gray-500" >{post.creator.email}</p>
          </div>
          <div className="copy_btn"  onClick={()=>{handleCopy}}>
            <Image
            src={copied === post.prompt? '/assets/icons/tick.svg':'/assets/icons/tick.svg'}
            width={12}
            height={12}
            alt="copy"
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
      className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={()=>handleTagClick && handleTagClick('#' + post.tag)}>#{post.tag}</p>
      {session?.user.id === post.creator._id && pathname === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 ">
          <p className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}>Delete</p>
        </div>
      ) }
    </div>
  )
}

export default PromptCard