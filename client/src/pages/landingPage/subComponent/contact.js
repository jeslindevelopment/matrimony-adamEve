import React, { useState } from "react";
import { Link } from "react-router-dom";
import DPButton from "../../../component/DPButton";
// import toast from "react-hot-toast";
// import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only digits
    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Implement form submission logic here, e.g., send data to backend
    const serviceId = "service_kwsc34f";
    const templateId = "template_ap7txmh";
    const publicKey = "drG99uRcVmmVfiT0M";

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_name: "Mohib Sheikh",
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
      },
    };

    // try {
    //   setIsLoader(true);
    //   await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
    //   setName("");
    //   setEmail("");
    //   setPhone("");
    //   setSubject("");
    //   setMessage("");
    //   toast.success(
    //     <h6>
    //       Thank you for contating us.
    //       <br />
    //       We shall get back to you soon!
    //     </h6>
    //   );
    //   setIsLoader(false);
    // } catch (error) {
    //   setName("");
    //   setEmail("");
    //   setPhone("");
    //   setSubject("");
    //   setMessage("");
    //   toast.error(<h6>Some error occured while sending email!</h6>);
    //   setIsLoader(false);
    // }
  };

  return (
    <div id="contact-us">
      {/* contact-info-section */}
      <section className="contact-info-section centred pt_120 pb_90">
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
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-2"></i>
                  </div>
                  <h3>Our Location</h3>
                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="info-block-one wow fadeInUp animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-43"></i>
                  </div>
                  <h3>Email Address</h3>
                  <p>
                    <Link href="mailto:developerspoint72@gmail.com">
                      abc@gmail.com
                    </Link>
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="info-block-one wow fadeInUp animated"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-44"></i>
                  </div>
                  <h3>Phone Number</h3>
                  <p>
                    <Link href="tel:11111111111">+(91) 11111111111</Link>
                    <br />
                    <br />
                  </p>
                </div>
              </div>
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
          <section className="contact-section pt_50 pb-3  wow fadeInRightBig animated">
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
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="username"
                        value={name}
                        placeholder="Your Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="subject"
                        value={subject}
                        required
                        placeholder="Subject"
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea
                        name="message"
                        placeholder="Type message"
                        value={message}
                        required
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred">
                      <DPButton title="Send Message" isLoader={isLoader} />{" "}
                    </div>
                  </div>
                </form>
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
