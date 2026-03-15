import React from "react"
import "./Footer.css"

function Footer() {
  return (

    <footer className="footer">

      <div className="footer-container">

        {/* ABOUT LINKS */}
        <div className="footer-col">

          <h3>ABOUT US</h3>

          <p>Who we are | Our stories</p>

          <h3>CURATIONS</h3>

          <h3>OUR LEGACY</h3>

          <h3>RESEARCH</h3>

          <h3>CONTACT</h3>

        </div>


        {/* CONTACT INFO */}
        <div className="footer-col">

          <h2>Contact Info</h2>

          <p><b>Address:</b></p>

          <p>
          Vedha Pudami Foundation <br/>
          Hyderabad, Telangana <br/>
          India
          </p>

          <p><b>Contact:</b> +91 6301557335</p>

          <p><b>Mail Us:</b></p>

          <p>vedhapudami144@gmail.com</p>

        </div>


        {/* NEWSLETTER */}
        <div className="footer-col">

          <h2>Subscribe to our Newsletter</h2>

          <div className="subscribe-box">

            <input type="email" placeholder="Email" />

            <button>Subscribe</button>

          </div>

          <div className="social">

            <span>Facebook</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>YouTube</span>

          </div>

        </div>

      </div>


      {/* bottom bar */}
      <div className="footer-bottom">

        <p>© 2026 Vedha Pudami Foundation. All rights reserved.</p>

        <p>Privacy Policy | Terms & Conditions | Sitemap</p>

      </div>

    </footer>

  )
}

export default Footer