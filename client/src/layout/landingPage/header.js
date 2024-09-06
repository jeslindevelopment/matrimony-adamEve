import React, { useState } from "react";
import Menu from "./Menu";
import { MobileMenu } from "./MobileMenu";
import logo from "../../assets/images/logo.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import AEButton from "../../component/AEButton";
import ProfilePopover from "./profilePopover";
import Modal from "react-bootstrap/Modal";
import AEInput from "../../component/AEInput";
import { Icon } from "@iconify/react";
import { color } from "../../assets/css/color/color";
import { loginData } from "../../constant";
import secureLocalStorage from "react-secure-storage";
export default function Header({
  scroll,
  handleMobileMenu,
  isSidebar,
  handleSidebar,
}) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleClose = () => {
    setFormData({});
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleCloseLogoutDialog = () => {
    setShowLogoutDialog(false);
  };
  const handleChangePassword = () => {
    if (!formData?.oldPassword) {
      setFormData({ ...formData, oldPasswordErr: "Please enter old password" });
      return;
    }
    if (!formData?.newPassword) {
      setFormData({ ...formData, newPasswordErr: "Please enter new password" });
      return;
    }
    if (!formData?.confirmPassword) {
      setFormData({
        ...formData,
        confirmPasswordErr: "Please  confirm password",
      });
      return;
    }
    if (formData?.newPassword != formData?.confirmPassword) {
      setFormData({
        ...formData,
        confirmPasswordErr: "Password does not match",
      });
      return;
    }
  };
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
                  {loginData ? (
                    <ProfilePopover
                      onChangePasswordClick={handleShow}
                      onLogoutClick={() => setShowLogoutDialog(true)}
                    />
                  ) : (
                    <Link smooth={true} duration={500}>
                      <AEButton
                        title="Login"
                        onClick={() => navigate("/auth/login")}
                      />
                    </Link>
                  )}
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
                  {loginData ? (
                    <ProfilePopover
                      onChangePasswordClick={handleShow}
                      onLogoutClick={() => setShowLogoutDialog(true)}
                    />
                  ) : (
                    <Link smooth={true} duration={500}>
                      <AEButton
                        title="Login"
                        onClick={() => navigate("/auth/login")}
                      />{" "}
                    </Link>
                  )}
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
          <AEInput
            placeholder="Current Password"
            formErr={formData?.oldPasswordErr}
            endText={
              <Icon
                icon={
                  formData?.oldShowPass
                    ? "lets-icons:eye-light"
                    : "iconamoon:eye-off-light"
                }
                color="black"
                width={25}
                onClick={() =>
                  setFormData({
                    ...formData,
                    oldShowPass: !formData?.oldShowPass,
                  })
                }
              />
            }
            type={formData?.oldShowPass ? "text" : "password"}
            onChange={(e) => {
              setFormData({
                ...formData,
                oldPassword: e.target.value,
                oldPasswordErr: "",
              });
            }}
          />
          <AEInput
            placeholder="New Password"
            formErr={formData?.newPasswordErr}
            endText={
              <Icon
                icon={
                  formData?.newShowPass
                    ? "lets-icons:eye-light"
                    : "iconamoon:eye-off-light"
                }
                color="black"
                width={25}
                onClick={() =>
                  setFormData({
                    ...formData,
                    newShowPass: !formData?.newShowPass,
                  })
                }
              />
            }
            type={formData?.newShowPass ? "text" : "password"}
            onChange={(e) => {
              setFormData({
                ...formData,
                newPassword: e.target.value,
                newPasswordErr: "",
              });
            }}
          />
          <AEInput
            placeholder="Confirm New Password"
            formErr={formData?.confirmPasswordErr}
            endText={
              <Icon
                icon={
                  formData?.confirmShowPass
                    ? "lets-icons:eye-light"
                    : "iconamoon:eye-off-light"
                }
                color="black"
                width={25}
                onClick={() =>
                  setFormData({
                    ...formData,
                    confirmShowPass: !formData?.confirmShowPass,
                  })
                }
              />
            }
            type={formData?.confirmShowPass ? "text" : "password"}
            onChange={(e) => {
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
                confirmPasswordErr: "",
              });
            }}
          />
          <div className="row">
            <div className="col-12">
              <AEButton
                title="Submit"
                fullWidth
                onClick={handleChangePassword}
              />
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
                onClick={() => {
                  secureLocalStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
