// import { useRouter } from "next/router"

import { Link } from "react-scroll";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  // const router = useRouter()
  const navigate = useNavigate();
  return (
    <>
      {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

      <ul className="navigation clearfix">
        <li>
          <Link
            to="banner"

            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="whyUs"
            onClick={() => navigate("/")}
            smooth={true}
            duration={100}
            style={{ cursor: "pointer" }}
          >
            Why Us
          </Link>
        </li>

        <li>
          <Link
            to="about"
            onClick={() => navigate("/")}
            smooth={true}
            duration={100}
            style={{ cursor: "pointer" }}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="process"
            smooth={true}
            onClick={() => navigate("/")}
            duration={100}
            style={{ cursor: "pointer" }}
          >
            Our Process
          </Link>
        </li>
        <li>
          <Link
            to="contact-us"
            onClick={() => navigate("/")}
            smooth={true}
            duration={100}
            style={{ cursor: "pointer" }}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </>
  );
}
