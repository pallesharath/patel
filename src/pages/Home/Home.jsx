import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

import banner from "../../assets/banner.jpg"
import museum1 from "../../assets/museum1.jpg"
import owner from "../../assets/owner.jpg"
import ViceChairman from "../../assets/ViceChairman.jpg"
import President from "../../assets/president.jpg"
import JointSecretary from "../../assets/JointSecretary.jpg"

import { supabase } from "../../supabaseClient"

function Home() {
  const [latestUpdate, setLatestUpdate] = useState("Loading latest update...")
  const [projects, setProjects] = useState([])
  const [latestPress, setLatestPress] = useState(null)
  const [pressLoading, setPressLoading] = useState(true)
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    const fetchLatestUpdate = async () => {
      const { data, error } = await supabase
        .from("homepage_header")
        .select("header_line")
        .order("updated_at", { ascending: false })
        .limit(1)
      if (error) { setLatestUpdate("Unable to load updates"); return }
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
        setProjects((data || []).map((p) => ({ ...p, title: p.tittle, imageUrl: p.image || null })))
      }
    }

    const fetchLatestPressImage = async () => {
      const { data, error } = await supabase.storage.from("press").list()
      const { data: linkRows, error: linkError } = await supabase
        .from("press_coverage")
        .select("file_name, url")
      if (linkError) {
        console.error("Press link fetch error:", linkError)
      }
      if (!error && data.length > 0) {
        const sorted = [...data].sort((a, b) =>
          new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
        )
        const { data: urlData } = supabase.storage.from("press").getPublicUrl(sorted[0].name)
        const linkMap = new Map((linkRows || []).map((row) => [row.file_name, row.url]))
        setLatestPress({
          imageUrl: urlData.publicUrl,
          linkUrl: linkMap.get(sorted[0].name) || null,
        })
      }
      setPressLoading(false)
    }

    const fetchTeamMembers = async () => {
      const { data, error } = await supabase.from("team").select("*").order("created_at", { ascending: false })
      if (!error) setTeamMembers(data)
    }

    fetchLatestUpdate()
    fetchProjects()
    fetchLatestPressImage()
    fetchTeamMembers()
  }, [])

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <img src={banner} alt="Vedha Pudami Foundation" />
        <div className="hero-content">
          <p className="hero-eyebrow">Est. March 2026</p>
          <h1 className="hero-title">Vedha Pudami<br /><span>Foundation</span></h1>
          <p className="hero-subtitle">Preserving India's Ancient Heritage Through Evidence-Based Research</p>
          <div className="hero-divider" />
        </div>
      </section>

      {/* UPDATE BAR */}
      <section className="updates">
        <div className="update-inner">
          <span className="update-label">Latest Update</span>
          <div className="update-ticker">
            <span>{latestUpdate}</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-bg" style={{ backgroundImage: `url(${museum1})` }} />
        <div className="about-veil" />
        <div className="about-content">
          <p className="section-eyebrow">Who We Are</p>
          <h2>About the Foundation</h2>
          <div className="about-rule" />
          <p>
            Vedha Pudami Foundation is a research-oriented organization established in March 2026
            with the aim of studying and preserving the ancient history, culture, and heritage of
            India. The foundation focuses on archaeology and heritage research, conducting in-depth
            studies of ancient temples and historical structures. Through careful research and
            documentation, it seeks to uncover historical truths with proper evidence and share
            this knowledge with society. The foundation also studies the symbols, statues, and
            sculptures found in temples to understand their historical significance. By promoting
            research and awareness, Vedha Pudami Foundation works to preserve cultural heritage
            and provide authentic historical knowledge for future generations.
          </p>
        </div>
      </section>

      {/* CHAIRMAN */}
      <section className="chairman-section">
        <div className="chairman-image-wrap">
          <div className="chairman-img-frame">
            <img src={owner} alt="Chairman" />
          </div>
          <div className="chairman-badge">Founder &amp; Chairman</div>
        </div>
        <div className="chairman-content">
          <p className="section-eyebrow">Leadership</p>
          <h2>Thella Satheesh Patel</h2>
          <div className="chairman-rule" />
          <p>
            Mr. Thella Satheesh Patel is the Founder and Chairman of the Vedha Pudami Foundation.
            With more than 14 years of experience, he has conducted extensive research on ancient
            history, temple architecture, and the cultural heritage of India. Through evidence-based
            research, his primary aim is to uncover historical truths and share that knowledge with
            society. Under his leadership, the foundation has initiated several impactful social
            programs and research initiatives.
          </p>
        </div>
      </section>

      {/* LEADERS */}
      <section className="leaders-section">
        <p className="section-eyebrow center">Core Leadership</p>
        <h2 className="section-heading center">Pillars of the Foundation</h2>
        <div className="leaders-grid">
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={ViceChairman} alt="Vice Chairman" />
            </div>
            <div className="leader-info">
              <h3>Gurram Thirupthi Reddy</h3>
              <span className="leader-role">Vice Chairman</span>
            </div>
          </div>
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={President} alt="General Secretary" />
            </div>
            <div className="leader-info">
              <h3>Kumbam Srinivas Reddy</h3>
              <span className="leader-role">General Secretary</span>
            </div>
          </div>
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={JointSecretary} alt="Joint Secretary" />
            </div>
            <div className="leader-info">
              <h3>Velgapuri Narsimrao</h3>
              <span className="leader-role">Joint Secretary</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS + PRESS */}
      <section className="media-section">
        <div className="media-col">
          <p className="section-eyebrow">What's Ahead</p>
          <h2 className="media-heading">Upcoming Projects</h2>
          <div className="media-rule" />
          <div className="project-grid">
            {projects.length > 0 ? projects.slice(0, 2).map((project) => (
              <div className="project-card" key={project.id}>
                <span className="corner-tr" />
                <span className="corner-bl" />
                <div className="project-img-wrap">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/480x360?text=No+Image' }}
                  />
                </div>
                <p className="project-title">{project.title}</p>
              </div>
            )) : <p className="empty-msg">No upcoming projects</p>}
          </div>
        </div>

        <div className="media-divider" />

        <div className="media-col">
          <p className="section-eyebrow">In the News</p>
          <h2 className="media-heading">Press Coverage</h2>
          <div className="media-rule" />
          <div className="press-grid">
            {pressLoading ? (
              <p className="empty-msg">Loading press coverage...</p>
            ) : latestPress ? (
              <div className="press-img-wrap">
                <span className="press-corner tl" />
                <span className="press-corner tr" />
                <span className="press-corner bl" />
                <span className="press-corner br" />
                {latestPress.linkUrl ? (
                  <a href={latestPress.linkUrl} target="_blank" rel="noreferrer" aria-label="Open press article">
                    <img
                      src={latestPress.imageUrl}
                      alt="Press coverage"
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/360x360?text=No+Image' }}
                    />
                  </a>
                ) : (
                  <img
                    src={latestPress.imageUrl}
                    alt="Press coverage"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/360x360?text=No+Image' }}
                  />
                )}
              </div>
            ) : (
              <p className="empty-msg">No press coverage available</p>
            )}
          </div>
          <div className="press-cta">
            <Link to="/press">
              <button className="cta-btn">View All Coverage <span>-&gt;</span></button>
            </Link>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <p className="section-eyebrow center">The People Behind the Work</p>
        <h2 className="section-heading center">Our Team</h2>
        <div className="team-rule" />
        <div className="team-grid">
          {teamMembers.length > 0 ? teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-img-wrap">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          )) : <p className="empty-msg center">No team members available</p>}
        </div>
      </section>

    </div>
  )
}

export default Home
