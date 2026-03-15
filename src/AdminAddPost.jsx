import React, {useState} from "react"
import { supabase } from "./supabaseClient"

function AdminAddPost(){

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [image,setImage] = useState("")
const [video,setVideo] = useState("")
const [link,setLink] = useState("")

const addPost = async () => {

const {data,error} = await supabase
.from("post")
.insert([
{
title:title,
description:description,
image:image,
video:video,
link:link
}
])

if(error){
alert("Error inserting data")
}
else{
alert("Post Added")
}

}

return(

<div>

<h2>Add Post</h2>

<input placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
/>

<input placeholder="Image URL"
onChange={(e)=>setImage(e.target.value)}
/>

<input placeholder="Video URL"
onChange={(e)=>setVideo(e.target.value)}
/>

<input placeholder="Link"
onChange={(e)=>setLink(e.target.value)}
/>

<button onClick={addPost}>
Add Post
</button>

</div>

)

}

export default AdminAddPost