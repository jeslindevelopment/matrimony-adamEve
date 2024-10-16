import React, { useState } from "react";
import { Link } from "react-router-dom";
import AEButton from "../../../component/AEButton";
import { color } from "../../../assets/css/color/color";
import AEInput from "../../../component/AEInput";
import { useDispatch } from "react-redux";
import { contactUs } from "../../../store/slice/auth";
// import toast from "react-hot-toast";
// import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!formData?.firstName) {
      setFormData({ ...formData, firstNameErr: "Please enter first name" });
      return;
    }
    if (!formData?.phone) {
      setFormData({ ...formData, phoneErr: "Please enter your phone number" });
      return;
    }
    if (formData?.phone?.length < 10) {
      setFormData({ ...formData, phoneErr: "Please enter valid phone number" });
      return;
    }
    if (!formData?.email) {
      setFormData({ ...formData, emailErr: "Please enter email" });
      return;
    }
    if (!formData?.message) {
      setFormData({ ...formData, messageErr: "Please enter message" });
      return;
    }
    setIsLoader(true);
    let request = {
      name: formData?.firstName,
      email: formData?.email,
      phone: formData?.phone * 1,
      message: formData?.message,
    };
    dispatch(contactUs(request, setIsLoader, setFormData));
  };
  console.log("fr", formData);
  return (
    <div id="contact-us">
      {/* contact-info-section */}
      <section className="contact-info-section centred pt_50 pb_90">
        <div className="auto-container">
          <div className="sec-title mb_70">
            <h6>Contact US</h6>
          </div>
          <div className="row clearfix">
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="info-block-one wow fadeInUp animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box" style={{ background: color.formBG }}>
                  <div className="icon-box">
                    <i className="icon-2"></i>
                  </div>
                  <h3>Our Location</h3>

                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <Link to="mailto:adamnevematrimony@gmail.com">
                <div
                  className="info-block-one wow fadeInUp animated"
                  data-wow-delay="300ms"
                  data-wow-duration="1500ms"
                >
                  <div
                    className="inner-box"
                    style={{ background: color.formBG }}
                  >
                    <div className="icon-box">
                      <i className="icon-43"></i>
                    </div>
                    <h3>Email Address</h3>
                    <p>adamnevematrimony@gmail.com </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <Link to="https://wa.me/8889332222" target="_blank">
                <div
                  className="info-block-one wow fadeInUp animated"
                  data-wow-delay="600ms"
                  data-wow-duration="1500ms"
                >
                  <div
                    className="inner-box"
                    style={{ background: color.formBG }}
                  >
                    <div className="icon-box">
                      <i className="icon-44"></i>
                    </div>
                    <h3>Whatsapp Number</h3>
                    <p>+(91)8889332222</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          {/* Google Map Section */}
          <section className="google-map-section pb_120 wow fadeInLeftBig animated">
            <div className="auto-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1406.9426496527212!2d74.89313555268338!3d22.023826061512874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3961f934b37e8957%3A0xd63268694bbcafd9!2sSatpuda%20colony!5e0!3m2!1sen!2sin!4v1719735533742!5m2!1sen!2sin"
                height={535}
                style={{ border: 0, width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="location"
              />
            </div>
          </section>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <section
            className="contact-section pt_50 pb-3  wow fadeInRightBig animated"
            style={{ background: color.formBG }}
          >
            {/* <h3 style={{ textAlign: "center", marginBottom: "30px" }}> */}
            <div
              className="sec-title"
              style={{ textAlign: "center", marginBottom: "30px" }}
            >
              <h6>Reach Out TO Us</h6>
            </div>
            {/* </h3> */}
            <div className="auto-container">
              <div className="sec-title"></div>
              <div className="form-inner">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <AEInput
                      formErr={formData?.firstNameErr}
                      value={formData?.firstName || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                          firstNameErr: "",
                        });
                      }}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <AEInput
                      height="60px"
                      type="number"
                      formErr={formData?.phoneErr}
                      value={formData?.phone || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: e.target.value.slice(0, 10),
                          phoneErr: "",
                        });
                      }}
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <AEInput
                      value={formData?.email || ""}
                      formErr={formData?.emailErr}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                          emailErr: "",
                        });
                      }}
                      placeholder="Your email"
                      type="email"
                    />
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea
                      name="message"
                      placeholder="Type message"
                      style={{ borderRadius: 5 }}
                      value={formData?.message || ""}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                          messageErr: "",
                        })
                      }
                    ></textarea>
                    <p
                      style={{
                        fontSize: 13,
                        marginTop: "-0.1rem",
                        marginBottom: "1rem",
                        marginLeft: "0.3rem",
                        color: "red",
                        fontWeight: 500,
                      }}
                    >
                      {formData?.messageErr}
                    </p>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred">
                    <AEButton
                      title="Send Message"
                      onClick={handleSubmit}
                      isLoader={isLoader}
                    />{" "}
                  </div>
                </div>{" "}
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* contact-info-section End */}

      {/* Google Map Section End */}

      {/* Contact Form Section */}

      {/* Contact Form Section End */}
    </div>
  );
};

export default Contact;
