import React, { useState } from "react"

function AdminLogin(){

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const login=(e)=>{
e.preventDefault()

if(username==="Sharath" && password==="Sharath123"){
window.location="/dashboard"
}
else{
alert("Invalid login")
}
}

return(

<div style={{padding:"50px",textAlign:"center"}}>

<h2>Admin Login</h2>

<form onSubmit={login}>

<input
type="text"
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button>Login</button>

</form>

</div>

)

}

export default AdminLogin