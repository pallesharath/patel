import React from "react"
import "./Contact.css"
import banner from "../../assets/banner.jpg"

function Contact() {

return (

<div className="contact-page">

{/* Banner */}
<div className="contact-banner">
<img src={banner} alt="contact banner"/>
</div>

{/* Breadcrumb */}
<div className="breadcrumb">
Home / Contact Us
</div>


{/* Contact Section */}

<div className="contact-container">

{/* Contact Info */}

<div className="contact-info">

<h2>Contact Information</h2>

<p>📍 Vedha Pudami Foundation Office</p>

<p>📞 +91 6301557335</p>

<p>✉ vedhapudamifoundation@gmail.com</p>

<p>
🕒 Mon – Fri 10:00 AM – 6:30 PM <br/>
Sat 10:00 AM – 2:00 PM
</p>

</div>


{/* Google Map */}

<div className="contact-map">

<iframe
src="https://www.google.com/maps?q=NKtrgBRVfyL3CMLz7&output=embed"
width="100%"
height="350"
style={{border:"0"}}
loading="lazy"
title="Vedha Pudami Foundation Location"
></iframe>

</div>

</div>

</div>

)

}

export default Contact