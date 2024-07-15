import React from "react";
import image from "../../../assets/images/1535303839A36I8979-Edit.jpg";
import shapeImage1 from "../../../assets/images/shape-12.png";

export default function Process() {
  return (
    <section id="process" className="process-section centred pt_120 pb_90 wow fadeInRightBig animated">
      <div
        className="bg-layer"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="auto-container">
        <div className="sec-title mb_110">
          <h6>Our process</h6>
          <h2>Find Perfect Partner</h2>
        </div>
        <div className="inner-container">
          <div className="processing-block-one wow fadeInUpBig animated">
            <div
              className="arrow-shape"
              style={{
                backgroundImage: `url("${shapeImage1}")`,
              }}
            ></div>
            <div className="inner-box">
              <span className="count-text">
                01 <br />
                Step
              </span>
              <h3>Create Account </h3>
              <p>Register here & put up your profile</p>
            </div>
          </div>
          <div className="processing-block-one wow fadeInUpBig animated">
            <div
              className="arrow-shape"
              style={{
                backgroundImage: `url(${shapeImage1})`,
              }}
            ></div>
            <div className="inner-box">
              <span className="count-text">
                02 <br />
                Step
              </span>
              <h3>Browse Profiles </h3>
              <p>
                Search your perfect life-partner from millions of trusted &
                authentic profiles.
              </p>
            </div>
          </div>
          <div className="processing-block-one wow fadeInUpBig animated">
            <div
              className="arrow-shape"
              style={{
                backgroundImage: `url(${shapeImage1})`,
              }}
            ></div>
            <div className="inner-box">
              <span className="count-text">
                03 <br />
                Step
              </span>
              <h3>Send Request & Connect</h3>
              <p>Access contact number and connect daily on call or via sms </p>
            </div>
          </div>
          <div className="processing-block-one wow fadeInUpBig animated">
            <div className="inner-box">
              <span className="count-text">
                04 <br />
                Step
              </span>
              <h3>Interact</h3>
              <p>
                Documents on Age,Address,Income etc.collected,Verified stamp and
                added to profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
