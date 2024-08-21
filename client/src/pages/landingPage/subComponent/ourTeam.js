import React from "react";
import { Link } from "react-router-dom";
import directorImage from "../../../assets/images/team-2.jpg";
export default function OurTeam() {
  return (
    <section className="team-section pt_120 pb_75">
      <div className="auto-container">
        <div className="sec-title mb_70 centred">
          <h6>Our Team</h6>
        </div>
        <div className="row clearfix">
          <div className="col-lg-6 col-md-6 col-sm-12 team-block">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-12 team-block">
                <div
                  className="team-block-one wow fadeInUp animated"
                  data-wow-delay="200ms"
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <img src={directorImage} alt="" width={"20%"} />
                      </figure>
                      {/* <ul className="social-links clearfix">
                                            <li><Link href="/team"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link href="/team"><i className="fab fa-twitter"></i></Link></li>
                                            <li><Link href="/team"><i className="fab fa-instagram"></i></Link></li>
                                        </ul> */}
                    </div>
                    <div className="lower-content">
                      <h3>
                        <Link href="/team-details">
                          Pas. Patrick Peter, Ph.D
                        </Link>
                      </h3>
                      <span className="designation">Founder & Director</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 team-block">
            <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-8 col-sm-12 team-block">
            <div
                  className="team-block-one wow fadeInUp animated"
                  data-wow-delay="200ms"
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <img src={directorImage} alt="" width={"20%"} />
                      </figure>
                      {/* <ul className="social-links clearfix">
                                            <li><Link href="/team"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link href="/team"><i className="fab fa-twitter"></i></Link></li>
                                            <li><Link href="/team"><i className="fab fa-instagram"></i></Link></li>
                                        </ul> */}
                    </div>
                    <div className="lower-content">
                      <h3>
                        <Link href="/team-details">Evg. Nisha Peter</Link>
                      </h3>
                      <span className="designation">
                        Women & Marriage Counselor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
