import React from "react";
import { Link } from "react-router-dom";
import directorImage from "../../../assets/images/team-1.JPG";
import directorImageOne from "../../../assets/images/team-3.jpg"
export default function OurTeam() {
  return (
    <section className="team-section pt_75">
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
                      <figure className="image" style={{height:"500px"}}>
                        <img src={directorImage} alt=""  />
                      </figure>
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
                      <figure className="image" style={{height:"500px"}}>
                        <img src={directorImageOne} alt=""   />
                      </figure>
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
