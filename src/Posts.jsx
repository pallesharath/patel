import React, {useEffect,useState} from "react"
import { supabase } from "./supabaseClient"

function Posts(){

const [posts,setPosts] = useState([])

useEffect(()=>{

fetchPosts()

},[])

const fetchPosts = async () => {

const {data,error} = await supabase
.from("post")
.select("*")

if(data){
setPosts(data)
}

}

return(

<div>

<h2>Posts</h2>

{
posts.map((post)=>(
<div key={post.id}>

<h3>{post.title}</h3>
<p>{post.description}</p>
{post.image && <img src={post.image} width="200" alt={post.title}/>}
{post.video && <video width="200" controls><source src={post.video} /></video>}
{post.link && <a href={post.link} target="_blank" rel="noopener noreferrer">Link</a>}

</div>
))
}

</div>

)

}

export default Posts