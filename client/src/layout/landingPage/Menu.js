// import { useRouter } from "next/router"

import { Link } from "react-scroll";
import React from "react";

export default function Menu() {
  // const router = useRouter()

  return (
    <>
      {/* <ul className="sub-menu">
                <Link className={router.pathname == "/" ? "active" : ""}>Home Default</Link>
                <Link className={router.pathname == "/index-2" ? "active" : ""}>Home Interior</Link>
            </ul> */}

      <ul className="navigation clearfix">
        <li>
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            style={{ cursor: "pointer" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="whyUs"
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
            duration={100}
            style={{ cursor: "pointer" }}
          >
            Our Process
          </Link>
        </li>
        <li>
          <Link
            to="contact-us"
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
