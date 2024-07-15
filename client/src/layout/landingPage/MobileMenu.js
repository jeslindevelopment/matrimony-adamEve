import { Link } from "react-scroll";
import React from "react";

export const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  return (
    <>
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={handleMobileMenu} />
        <div className="close-btn" onClick={handleMobileMenu}>
          <i className="fas fa-times"></i>
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link to="/">
              <img src="assets/images/logo.jpeg" alt="" />
            </Link>
          </div>

          {/*menu-outer*/}
          <div className="menu-outer">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix">
                <li>
                  <Link to="/" smooth={true} duration={500}>
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        handleMobileMenu();
                      }}
                      style={{ color: "white" }}
                    >
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="whyUs"
                    smooth={true}
                    duration={100}
                    onClick={() => {
                      handleMobileMenu();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    onClick={() => {
                      handleMobileMenu();
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="process"
                    smooth={true}
                    duration={500}
                    onClick={() => {
                      handleMobileMenu();
                    }}
                  >
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact-us"
                    smooth={true}
                    duration={500}
                    onClick={() => {
                      handleMobileMenu();
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/*menu-outer end*/}
          <div className="contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>
                Infront of Dashera Maidan, Satpuda Colony <br />
                Gate, Barwani - 451551
              </li>
              <li>
                <Link href="mailto:developerspoint72@gmail.com">
                  developerspoint72@gmail.com
                </Link>
              </li>
              <li>
                <Link to="tel:8821988211">+(91) 88219-88211</Link>
              </li>
            </ul>
          </div>

          {/*Social Links*/}
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61558413507776"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fab fa-facebook-square"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/developers_point_barwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fab fa-instagram"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/developer-spoint/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fab fa-linkedin"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
};
