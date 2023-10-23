"use client"

import Profile from "@components/Profile";
import PromptCard from "@components/PromptCard";
import { useEffect,useState } from "react";
import { useSearchParams } from 'next/navigation'


type UserType={
    user:/* {
        id:string,
        email:string,
        username:string,
        _id:string,
        _v:number
    } */any ,
    desc:string,
}

const UserProfile=({desc,user}:UserType)=>{
  const[posts,setPosts]=useState([])
    useEffect(()=>{
    fetch(`/api/users/${user._id}/posts`)
    .then(res=>res.json())
    .then(res=>setPosts(res))
    },[])
    return(
        <section className="w-full">
         <h1 className="head_text text_left">
          <span className="blue_gradient">
          {user.username} Profile
          </span>
          </h1>
          <p className="desc text-left">{desc}</p>
          <div className="mt-10 prompt_layout">
        {posts.map((p:any)=>(
          <PromptCard
                key={p._id}
                post={p} handleTagClick={undefined} handleEdit={undefined} handleDelete={undefined}          />
        ))}
      </div> 
      </section>
    )
}

const ClientProfile = () => {
  const[user,setUser]=useState('')
    const searchParams = useSearchParams()
    const search = searchParams.get('name')
    useEffect(()=>{
  fetch(`/api/user/${search}`)
  .then(res=>res.json())
  .then(res=>setUser(res[0]))
  },[])
  return (
    user && <UserProfile 
    desc='Welcome'
    user={user}
    />  
  )
}

export default ClientProfile