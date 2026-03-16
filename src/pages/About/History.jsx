import "./History.css"

import historyImg from "../../assets/museum1.jpg"

function History() {
  return (
    <div className="history-page">

      {/* TOP IMAGE */}
      <div className="history-image">
        <img src={historyImg} alt="Foundation History"/>
      </div>

      {/* HISTORY CONTENT */}
      <div className="history-content">

        <h1>Our History</h1>

        <p>
          Vedha Pudami Foundation was established in March 2026 with the vision
          of researching and preserving the ancient heritage and cultural
          history of India. The organization focuses on archaeological
          research, documentation of historical temples, and the study of
          ancient symbols and sculptures found in sacred structures.
        </p>

        <p>
          Through evidence-based research and field studies, the foundation
          aims to uncover historical truths and present authentic knowledge
          to society. The research team works on identifying historical
          connections between temples, ancient architecture, and cultural
          traditions.
        </p>

        <p>
          Over the years, the foundation has initiated various research
          projects, awareness programs, and heritage preservation activities.
          Its mission is to protect historical knowledge and pass it to
          future generations through proper documentation and education.
        </p>

      </div>

    </div>
  )
}

export default History