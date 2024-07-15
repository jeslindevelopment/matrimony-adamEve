import React from "react";
import Menu from "./Menu";
import { MobileMenu } from "./MobileMenu";
import logo from "../../assets/images/logo.png";
import DPButton from "../../component/DPButton";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handlePopup,
  handleSidebar,
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* <header className="main-header header-style-three"> */}

      <header
        className={`main-header header-style-three ${
          scroll ? "fixed-header" : ""
        }`}
      >
        {/* header-lower */}
        <div className="auto-container">
          <div className="header-lower">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={logo} alt="" width="150px" />
                  </Link>
                </figure>
              </div>
              <div className="menu-area">
                {/* Mobile Navigation Toggler */}
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                </div>
                <nav className="main-menu navbar-expand-md navbar-light clearfix">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <Menu />
                  </div>
                </nav>
                <div className="menu-right-content ml_70">
                  <Link
                    onClick={() => navigate("/auth/login")}
                    smooth={true}
                    duration={500}
                  >
                    <DPButton title="Login" />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sticky Header */}
        <div className="sticky-header">
          <div className="large-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={logo} alt="" width="150px" />
                  </Link>
                </figure>
              </div>
              <div className="menu-area">
                <nav className="main-menu clearfix">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <Menu />
                  </div>
                </nav>
                <div className="menu-right-content ml_70">
                  <Link
                    onClick={() => navigate("/auth/login")}
                    smooth={true}
                    duration={100}
                  >
                    <DPButton title="Login" />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        handleMobileMenu={handleMobileMenu}
        isSidebar={isSidebar}
        handleSidebar={handleSidebar}
      />
    </>
  );
}
