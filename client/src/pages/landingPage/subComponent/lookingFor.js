import React from "react";
import { color } from "../../../assets/css/color/color";
import { Link } from "react-router-dom";
import brideImage from "../../../assets/images/bride-main.jpg"
import groomImage from "../../../assets/images/groom-main.avif"

export default function LookingFor() {
  return (
    <section
      className="about-style-two pt_80 pb_30"
      style={{ background: color.formBG }}
    >
      <div
        className="wow fadeInRightBig animated"
        data-wow-delay="00ms"
        data-wow-duration="1500ms"
      >
        <div className="auto-container">
          <div className="sec-title centred mb_60">
            <h6>Looking For</h6>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <Link to="/profile-listings">
                <div className="image_block_two">
                  <div className="image-box">
                    <div className="image-shape"></div>
                    <figure className="grow image">
                      <img
                        src={brideImage}
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              </Link>
              <h4 className="text-center py-3">Bride</h4>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <Link to="/profile-listings">
                <div className="image_block_two">
                  <div className="image-box">
                    <div className="image-shape"></div>
                    <figure className="grow image">
                      <img
                        src={groomImage}
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              </Link>
              <h4 className="text-center py-3">Groom</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
