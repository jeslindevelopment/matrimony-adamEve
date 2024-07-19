import React from "react";
import { Link } from "react-router-dom";

export default function ProfilePopover({ onChangePasswordClick,onLogoutClick }) {
  return (
    <nav className="main-menu clearfix">
      <div
        className="collapse navbar-collapse show clearfix"
        id="navbarSupportedContent"
      >
        <ul className="navigation clearfix">
          <li className="dropdown">
            <img
              src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
              alt=""
              style={{ borderRadius: 500 }}
              height={60}
              width={80}
            />
            <ul>
              <li>
                <Link to="/profile-setting">Profile Setting</Link>
              </li>
              <li onClick={onChangePasswordClick}>
                <Link> Change Password</Link>
              </li>
              <li onClick={onLogoutClick}>
                <Link>Logout</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
