import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import "./Home.css"

import banner from "../../assets/banner.jpg"
import museum1 from "../../assets/museum1.jpg"
import owner from "../../assets/owner.jpg"
import ViceChairman from "../../assets/ViceChairman.jpg"
import President from "../../assets/president.jpg"
import JointSecretary from "../../assets/JointSecretary.jpg"

import { supabase } from "../../supabaseClient"



function Home() {
  const { t } = useTranslation()
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const n = teamMembers.length
  
  const mod = (x, m) => ((x % m) + m) % m

  const getCardClass = (i) => {
    if (n === 0) return "team-card"
    const offset = mod(i - currentIndex, n)
    if (offset === 0) return "team-card tc-active"
    if (offset === 1) return "team-card tc-next"
    if (offset === n - 1) return "team-card tc-prev"
    if (offset === 2) return "team-card tc-far-next"
    if (offset === n - 2) return "team-card tc-far-prev"
    return "team-card tc-hidden"
  }

  const moveCarousel = (dir) => setCurrentIndex((prev) => mod(prev + dir, n))
  const goTo = (i) => setCurrentIndex(i)

  useEffect(() => {
    const handleKey = (e) => {
      if (n === 0) return
      if (e.key === "ArrowLeft") moveCarousel(-1)
      if (e.key === "ArrowRight") moveCarousel(1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [n, moveCarousel])

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <img src={banner} alt="Vedha Pudami Foundation" />
        <div className="hero-content">
          <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="hero-title">Vedha Pudami<br /><span>Foundation</span></h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
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
          <p className="section-eyebrow">{t('about.eyebrow')}</p>
          <h2>{t('about.title')}</h2>
          <div className="about-rule" />
          <p>
            {t('about.content')}
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
          <p className="section-eyebrow">{t('chairman.eyebrow')}</p>
          <h2>Thella Satheesh Patel</h2>
          <div className="chairman-rule" />
          <p>
            {t('chairman.content')}
          </p>
        </div>
      </section>

      {/* LEADERS */}
      <section className="leaders-section">
        <p className="section-eyebrow center">{t('leaders.eyebrow')}</p>
        <h2 className="section-heading center">{t('leaders.title')}</h2>
        <div className="leaders-grid">
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={ViceChairman} alt="Vice Chairman" />
            </div>
            <div className="leader-info">
              <h3>Gurram Thirupathi Reddy</h3>
              <span className="leader-role">{t('leaders.viceChairman')}</span>
            </div>
          </div>
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={President} alt="President" />
            </div>
            <div className="leader-info">
              <h3>Kumbam Srinivas Reddy</h3>
              <span className="leader-role">{t('leaders.president')}</span>
            </div>
          </div>
          <div className="leader-card">
            <div className="leader-img-wrap">
              <img src={JointSecretary} alt="Joint Secretary" />
            </div>
            <div className="leader-info">
              <h3>Velgapuri Narasima Rao</h3>
              <span className="leader-role">{t('leaders.jointSecretary')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS + PRESS */}
      <section className="media-section">
        <div className="media-col">
          <p className="section-eyebrow">{t('projects.eyebrow')}</p>
          <h2 className="media-heading">{t('projects.title')}</h2>
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
          <p className="section-eyebrow">{t('press.eyebrow')}</p>
          <h2 className="media-heading">{t('press.title')}</h2>
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
        <h2 className="section-heading center" style={{ color: "var(--white)" }}>Our Team</h2>
        <div className="team-rule" />

        {teamMembers.length > 0 ? (
          <div className="team-carousel-outer">
      <div className="team-carousel-wrap">

        <button
          className="team-carousel-btn btn-prev"
          onClick={() => moveCarousel(-1)}
          aria-label="Previous team member"
        >
          &#8592;
        </button>

        <div className="team-carousel-track">
          {teamMembers.map((member, i) => (
            <div className={getCardClass(i)} key={member.id}>
              <div className="team-img-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/220x260?text=No+Image' }}
                />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="team-carousel-btn btn-next"
          onClick={() => moveCarousel(1)}
          aria-label="Next team member"
        >
          &#8594;
        </button>
      </div>

      <div className="team-carousel-dots">
        {teamMembers.map((_, i) => (
          <button
            key={i}
            className={`dot${i === currentIndex ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to team member ${i + 1}`}
          />
        ))}
      </div>
    </div>
  ) : (
    <p className="empty-msg center">No team members available</p>
  )}
</section>

    </div>
  )
}

export default Home
