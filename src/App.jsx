import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./App.css"

// Main Pages
import Home from "./pages/Home/Home"
import History from "./pages/About/History"
import Custodian from "./pages/About/Custodian"

import Articles from "./pages/Media/Articles"
import PressCoverage from "./pages/Media/PressCoverage"
import Pictures from "./pages/Media/Pictures"
import Broadcast from "./pages/Media/Broadcast"

import Contact from "./pages/Contact/Contact"
import Career from "./pages/career/Career"

// Admin Pages
import AdminLogin from "./admin/AdminLogin"
import Dashboard from "./admin/Dashboard"

import PressAdmin from "./pages/admin/PressAdmin"
import ProjectsAdmin from "./pages/admin/ProjectsAdmin"
import TeamAdmin from "./pages/admin/TeamAdmin"
import UpdatesAdmin from "./pages/admin/UpdatesAdmin"
import CareerAdmin from "./pages/admin/CareerAdmin"

function App() {
  return (

<BrowserRouter>

<Navbar />

<Routes>

{/* Public Pages */}

<Route path="/" element={<Home />} />

<Route path="/history" element={<History />} />
<Route path="/custodian" element={<Custodian />} />

<Route path="/articles" element={<Articles />} />
<Route path="/press" element={<PressCoverage />} />
<Route path="/pictures" element={<Pictures />} />
<Route path="/broadcast" element={<Broadcast />} />

<Route path="/contact" element={<Contact />} />
<Route path="/career" element={<Career />} />


{/* Admin Login */}

<Route path="/admin" element={<AdminLogin />} />


{/* Admin Dashboard */}

<Route path="/dashboard" element={<Dashboard />} />


{/* Admin Control Pages */}

<Route path="/admin/press" element={<PressAdmin />} />

<Route path="/admin/projects" element={<ProjectsAdmin />} />

<Route path="/admin/team" element={<TeamAdmin />} />

<Route path="/admin/updates" element={<UpdatesAdmin />} />

<Route path="/admin/career" element={<CareerAdmin />} />

</Routes>

<Footer />

</BrowserRouter>

  )
}

export default App