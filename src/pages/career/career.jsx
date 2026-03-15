import React from "react"
import "./career.css"

import careerBanner from "../../assets/career-banner.jpg"

function Career() {

return(

<div className="career-page">

{/* HERO IMAGE */}

<div 
className="career-hero"
style={{backgroundImage:`url(${careerBanner})`}}
>

<div className="career-hero-content">

<h1>Join Our Team</h1>

<p>
At Vedha Pudami Foundation, we are always looking for passionate individuals who are interested in researching, preserving, and promoting India's ancient history, culture, and heritage.

Our mission focuses on studying ancient temples, archaeological sites, historical architecture, and cultural traditions. We welcome people who are dedicated to knowledge, research, and meaningful cultural work.

If you are an archaeologist, historian, architect, researcher, content writer, graphic designer, web developer, or someone who is passionate about heritage and cultural documentation, you may be a great fit for our team.

If you would like to contribute to our mission and be part of this journey of discovering and sharing historical knowledge,

</p>
<p>
    please send your CV or portfolio to.vedhapudami144@gmail.com
</p>

</div>

</div>

</div>

)

}

export default Career