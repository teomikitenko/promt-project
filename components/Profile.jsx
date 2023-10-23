
import PromptCard from "./PromptCard"
const Profile = ({name,desc,data,handleEdit,handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text_left">
        <span className="blue_gradient">
        {name} Profile
        </span>
        </h1>
        <p className="desc text-left">{desc}</p>
        <div className="mt-10 prompt_layout">
      {data.map((p)=>(
        <PromptCard
        key={p._id}
        post={p}
        handleEdit={()=>handleEdit&&handleEdit(p)}
        handleDelete={()=>handleDelete&&handleDelete(p)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile