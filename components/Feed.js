"use client"
import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"


/* type Post={
  post_id:string,
  post:string
}
type PostsList={
  data:Post[],
  handleTagClick:any
}
 */


const PromptCardList =({data,handleTagClick}/* :PostsList */)=>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((p)=>(
        <PromptCard
        key={p._id}
        post={p}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const[searchText,setSearchText]=useState('')

  const [posts,setPosts] = useState([])  
  const[searchedPosts,setSearchedPosts]=useState([])
  
  const handleSearchChange=(e)=>{
    setSearchText(e.target.value)}
  

const searchPosts=()=>{
const searchExp=new RegExp(searchText,'i')

return posts.filter(p=>{
  return  searchExp.test(p.prompt)|| searchExp.test('#' + p.tag) ||searchExp.test(p.creator.username) 
})
}
useEffect(()=>{
  if(searchText.length>0){
    setSearchedPosts(searchPosts(searchPosts))
  }}
,[searchText])

const handleTagClick=(e)=>{
  console.log(e)
 setSearchText(e)
 
}

  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch('/api/prompt')
      const data=await response.json()
      setPosts(data)
    }
    fetchPosts()
  },[])
  return (
    <section className="feed" >
    <form className="relative w-full flex-center">
      <input
       type="text"
       placeholder="Search for a tag or a username"
       value={searchText}
       onChange={handleSearchChange}
       className="search_input peer"
       />
    </form>
        <PromptCardList
        data={searchText?searchedPosts:posts}
        handleTagClick={handleTagClick}
        /> 
    </section>
  )
}
export default Feed