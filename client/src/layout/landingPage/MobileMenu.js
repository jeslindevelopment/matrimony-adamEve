import { Link } from "react-scroll";
import React from "react";
import { useNavigate } from "react-router-dom";

export const MobileMenu = ({
  isSidebar,
  handleMobileMenu,
  handleSidebar,
  loginData,
  onChangePasswordClick,
  onLogoutClick,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mobile-menu">
        <div
          className="menu-backdrop"
          onClick={() => handleMobileMenu(false)}
        />
        <div className="close-btn" onClick={() => handleMobileMenu(false)}>
          <i className="fas fa-times"></i>
        </div>
        <nav className="menu-box">
          <div className="nav-logo" style={{display:'flex',justifyContent:'center',marginBottom:'-3rem'}}>
            {loginData ? (
              <img
                src="https://wallpapers.com/images/hd/cool-profile-pictures-hoodie-cat-6dkl56hixhnq590g.jpg"
                alt=""
                style={{ borderRadius: 50, border: "3px solid white" }}
                height={100}
                width={100}
              />
            ) : (
              <Link to="/">
                <img src="assets/images/logo.jpeg" alt="" />
              </Link>
            )}
          </div>

          {/*menu-outer*/}
          <div className="menu-outer">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              {loginData ? (
                <ul className="navigation clearfix">
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        navigate("/");
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        navigate("/profile-setting");
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Profile Setting
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        navigate("/my-interest");
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      My Interest
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        navigate("/my-favourite");
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      My Favourites
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        navigate("/message");
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        onChangePasswordClick();
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => {
                        onLogoutClick();
                        handleMobileMenu(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navigation clearfix">
                  <li>
                    <Link
                      smooth={true}
                      duration={500}
                      onClick={() => navigate("/auth/login")}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/" smooth={true} duration={500}>
                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          handleMobileMenu(false);
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
                        handleMobileMenu(false);
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
                        handleMobileMenu(false);
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
                        handleMobileMenu(false);
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
                        handleMobileMenu(false);
                      }}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              )}
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
                  xyz@gmail.com
                </Link>
              </li>
              <li>
                <Link to="tel:8821988211">+(91) 11111111111</Link>
              </li>
            </ul>
          </div>

          {/*Social Links*/}
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <a
                  // href="https://www.facebook.com/profile.php?id=61558413507776"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fab fa-facebook-square"></span>
                </a>
              </li>
              <li>
                <a
                  // href="https://www.instagram.com/developers_point_barwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fab fa-instagram"></span>
                </a>
              </li>
              <li>
                <a
                  // href="https://www.linkedin.com/company/developer-spoint/"
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
