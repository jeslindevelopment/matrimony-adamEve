import React from "react";
import { Link } from "react-router-dom";

export default function ProfilePopover({
  onChangePasswordClick,
  onLogoutClick,
}) {
  return (
    <nav className="main-menu clearfix">
      <div
        className="collapse navbar-collapse show clearfix"
        id="navbarSupportedContent"
      >
        <ul className="navigation clearfix">
          <li className="dropdown">
            <img
              src="https://wallpapers.com/images/hd/cool-profile-pictures-hoodie-cat-6dkl56hixhnq590g.jpg"
              alt=""
              style={{ borderRadius: 50 }}
              height={60}
              width={60}
            />
            <ul>
              <li>
                <Link to="/profile-setting">Profile Setting</Link>
              </li>
              <li>
                <Link to="/my-interest">My Interest</Link>
              </li>
              <li>
                <Link to="/my-favourite">My Favourites</Link>
              </li>
              <li>
                <Link to="/message">Messages</Link>
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
