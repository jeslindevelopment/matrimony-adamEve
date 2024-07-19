import React, { useState } from "react";
import Menu from "./Menu";
import { MobileMenu } from "./MobileMenu";
import logo from "../../assets/images/logo.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import AEButton from "../../component/AEButton";
import ProfilePopover from "./profilePopover";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AEInput from "../../component/AEInput";
import { color } from "../../assets/css/color/color";
export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isSidebar,
  handlePopup,
  handleSidebar,
}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseLogoutDialog = () => setShowLogoutDialog(false);
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
                    <AEButton title="Login" />{" "}
                  </Link>
                  <ProfilePopover onChangePasswordClick={handleShow} onLogoutClick={()=>setShowLogoutDialog(true)} />
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
                    <AEButton title="Login" />{" "}
                  </Link>
                  <ProfilePopover onChangePasswordClick={handleShow} onLogoutClick={()=>setShowLogoutDialog(true)} />
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

      {/* change password */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: color.modalBG }}>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: color.modalBG }}>
          <AEInput placeholder="Current Password" />
          <AEInput placeholder="New Password" />
          <AEInput placeholder="Confirm New Password" />
          <div className="row">
            <div className="col-12">
              <AEButton title="Submit" fullWidth onClick={handleClose} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* logout */}
      {/* change password */}
      <Modal show={showLogoutDialog} onHide={handleCloseLogoutDialog} centered>
        <Modal.Header closeButton style={{ backgroundColor: color.modalBG }}>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: color.modalBG }}>
          <div className="fs-5 fw-bolder">Are you sure you want to logout?</div>
          <div className="row pt-5">
            <div className="col-12">
              <AEButton
                title="Logout"
                fullWidth
                onClick={handleCloseLogoutDialog}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
