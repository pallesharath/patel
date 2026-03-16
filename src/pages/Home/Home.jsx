import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

import banner from "../../assets/banner.jpg"
import museum1 from "../../assets/museum1.jpg"
import owner from "../../assets/owner.jpg"
import ViceChairman from "../../assets/ViceChairman.jpg"
import President from "../../assets/president.jpg"

import { supabase } from "../../supabaseClient"

function Home() {

  const [latestUpdate, setLatestUpdate] = useState("Loading latest update...")
  const [projects, setProjects] = useState([])
  const [latestPressImage, setLatestPressImage] = useState(null)
  const [pressLoading, setPressLoading] = useState(true)

  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {

    const fetchLatestUpdate = async () => {
      // Fetch from homepage_header table
      const { data, error } = await supabase
        .from("homepage_header")
        .select("header_line")
        .order("updated_at", { ascending: false })
        .limit(1)

      if (error) {
        console.error("Supabase error (homepage_header):", error)
        setLatestUpdate("Unable to load updates")
        return
      }

      if (data && data.length > 0 && data[0].header_line) {
        setLatestUpdate(data[0].header_line)
      } else {
        setLatestUpdate("No updates available")
      }
    }

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("post")
        .select("id, tittle, image")
        .order("id", { ascending: false })
        .limit(2)

      if (!error) {
        const mapped = (data || []).map((p) => {
          return {
            ...p,
            title: p.tittle,
            imageUrl: p.image || null
          };
        });
        setProjects(mapped);
      }
    }

    const fetchLatestPressImage = async () => {

      const { data, error } = await supabase
        .storage
        .from("press")
        .list()

      if (!error && data.length > 0) {

        const sorted = [...data].sort((a, b) => {
          const aTime = new Date(a.updated_at || a.created_at).getTime()
          const bTime = new Date(b.updated_at || b.created_at).getTime()
          return bTime - aTime
        })

        const latest = sorted[0]

        const { data: urlData } = supabase
          .storage
          .from("press")
          .getPublicUrl(latest.name)

        setLatestPressImage(urlData.publicUrl)
      }

      setPressLoading(false)
    }

    const fetchTeamMembers = async () => {

      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error) {
        setTeamMembers(data)
      }

    }

    fetchLatestUpdate()
    fetchProjects()
    fetchLatestPressImage()
    fetchTeamMembers()

  }, [])


  return (
    <div className="home">

      {/* HERO IMAGE */}
      <section className="hero">
        <img src={banner} alt="Vedha Pudami Foundation" />
      </section>


      {/* UPDATE BAR (FIXED) */}
      <section className="updates">
        <div className="update-scroll">
          <span>Latest update: {latestUpdate}</span>
        </div>
      </section>


      {/* ABOUT */}
      <section
        className="about-image"
        style={{ backgroundImage: `url(${museum1})` }}
      >
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Vedha Pudami Foundation is a research-oriented organization
            established in March 2026 with the aim of studying and
            preserving the ancient history, culture, and heritage of
            India. The foundation focuses on archaeology and heritage
            research, conducting in-depth studies of ancient temples
            and historical structures. Through careful research and
            documentation, it seeks to uncover historical truths with
            proper evidence and share this knowledge with society.
            The foundation also studies the symbols, statues, and
            sculptures found in temples to understand their historical
            significance. By promoting research and awareness, Vedha
            Pudami Foundation works to preserve cultural heritage and
            provide authentic historical knowledge for future generations.
          </p>
        </div>
      </section>


      {/* CHAIRMAN */}
      <section className="chairman">
        <img src={owner} alt="Chairman" />

        <div className="chairman-content">
          <h2>Foundation Chairman</h2>
          <p>
            Mr. Thella Satheesh Patel is the Founder and Chairman of the Vedha Pudami Foundation. With more
             than 14 years of experience, he has conducted extensive research on ancient history, temple
              architecture, and the cultural heritage of India. Through evidence-based research, his primary 
              aim is to uncover historical truths and share that knowledge with society. Under his leadership, 
            the foundation has initiated several impactful social programs and research initiatives.
          </p>
        </div>
      </section>


      {/* VICE CHAIRMAN */}
      <section className="vice-chairman">

        <div className="vice-chairman-content">
          <h2>Vice Chairman</h2>
          <p>
            Mr. Gurram Thirupathi Reddy, the Vice Chairman of Vedha Pudami
            Foundation, supports the mission of the foundation by
            coordinating outreach programs, educational initiatives,
            and social development projects. His dedication strengthens
            the organisation’s impact on the community.
          </p>
        </div>

        <img src={ViceChairman} alt="Vice Chairman" />

      </section>


      {/* PRESIDENT */}
      <section className="president">

        <img src={President} alt="President" />

        <div className="president-content">
          <h2>President</h2>
          <p>
            Mr. Thella Satheesh the President of Vedha Pudami Foundation,
            leads the organisation with a vision to research,
            preserve, and promote India’s ancient heritage.
            Through dedication and leadership, he guides the
            foundation in exploring historical temples,
            cultural traditions, and archaeological knowledge
            for the benefit of society.
          </p>
        </div>

      </section>


      {/* PROJECTS + PRESS */}
      <section className="media-section">

        <div className="media-box">

          <h2 className="media-title">Upcoming Project</h2>


          <div className="media-images">
            {projects.length > 0 ? (
              projects.slice(0, 2).map((project) => (
                <div className="media-card" key={project.id}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '16px', background: '#f5f5f5' }}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/480x360?text=No+Image'; }}
                  />
                  <p className="title">{project.title}</p>
                </div>
              ))
            ) : (
              <p>No upcoming projects</p>
            )}
          </div>

        </div>


        <div className="media-box">

          <h2 className="media-title">Press Coverage</h2>


          <div className="press-images" style={{ display: 'flex', gap: '20px' }}>
            {pressLoading ? (
              <p>Loading latest press coverage...</p>
            ) : latestPressImage ? (
              // Show last 2 press images side by side
              [latestPressImage].concat([]).slice(0, 2).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Press coverage ${idx + 1}`}
                  style={{ width: '100%', maxWidth: '360px', height: '360px', objectFit: 'cover', borderRadius: '16px', background: '#f5f5f5' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/360x360?text=No+Image'; }}
                />
              ))
            ) : (
              <p>No press coverage available</p>
            )}
          </div>

          <div className="view-more">
            <Link to="/press">
              <button>View More</button>
            </Link>
          </div>

        </div>

      </section>


      {/* TEAM MEMBERS */}
      <section className="team">

        <h2>Our Team</h2>

        <div className="team-container">

          {teamMembers.length > 0 ? (

            teamMembers.map((member) => (

              <div className="team-card" key={member.id}>

                <img src={member.image} alt={member.name} />

                <h3>{member.name}</h3>

                <p>{member.role}</p>

              </div>

            ))

          ) : (

            <p>No team members available</p>

          )}

        </div>

      </section>

    </div>
  )
}

export default Home