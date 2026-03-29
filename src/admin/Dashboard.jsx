import React, { useState, Suspense, lazy } from "react"


import UpdatesAdmin from "../pages/admin/UpdatesAdmin"
import ProjectsAdmin from "../pages/admin/ProjectsAdmin"
import PressAdmin from "../pages/admin/PressAdmin"
import TeamAdmin from "../pages/admin/TeamAdmin"
import CareerAdmin from "../pages/admin/CareerAdmin"


const HeaderAdmin = lazy(() => import("../pages/admin/HeaderAdmin"));

function Dashboard(){

const [section,setSection] = useState("")

return(

<div style={{padding:"40px"}}>

<h1>Admin Dashboard</h1>

<div style={{marginBottom:"20px"}}>

<button onClick={()=>setSection("pictures")}>Manage Pictures</button>
<button onClick={()=>setSection("projects")}>Manage Projects</button>
<button onClick={()=>setSection("press")}>Manage Press Coverage</button>
<button onClick={()=>setSection("team")}>Manage Team Members</button>
<button onClick={()=>setSection("career")}>View Career Applications</button>
<button onClick={()=>setSection("header")}>Update Homepage Header</button>

</div>

{/* SECTION DISPLAY */}

{section === "pictures" && <UpdatesAdmin/>}
{section === "projects" && <ProjectsAdmin/>}
{section === "press" && <PressAdmin/>}
{section === "team" && <TeamAdmin/>}
{section === "career" && <CareerAdmin/>}
{section === "header" && (
	<Suspense fallback={<div>Loading...</div>}>
		<HeaderAdmin />
	</Suspense>
)}

</div>

)

}

export default Dashboard
