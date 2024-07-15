import React from "react";
import { Link } from "react-router-dom";

const Specification = () => {
  return (
    <div>
      <section className="service-style-three service-page-2 pt_120 pb_90">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details">
                    <img src="assets/images/service/service-5.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-12"></i>
                  </div>
                  <h4>
                    <Link href="/service-details">Programming Skills</Link>
                  </h4>
                  <ul className="list-item clearfix">
                    <li>Build programming logics in practical way.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details-2">
                    <img src="assets/images/service/service-6.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-13"></i>
                  </div>
                  <h4>
                    <Link href="/service-details-2">
                      Application Development
                    </Link>
                  </h4>
                  <ul className="list-item clearfix">
                    <li>Learn application development life cycle.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details-3">
                    <img src="assets/images/service/service-7.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-14"></i>
                  </div>
                  <h4> Application Development</h4>
                  <p>Learn application development life cycle.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="900ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details-4">
                    <img src="assets/images/service/service-8.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-15"></i>
                  </div>
                  <h4>
                    <Link href="/service-details-4">Database</Link>
                  </h4>
                  <ul className="list-item clearfix">
                    <li>Learn database systems and operations.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="0ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details-5">
                    <img src="assets/images/service/service-9.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-16"></i>
                  </div>
                  <h4>
                    <Link href="/service-details-5">WebSite Design</Link>
                  </h4>
                  <ul className="list-item clearfix">
                    <li>Learn how to build a WebPage and styling.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 service-block">
              <div
                className="service-block-one wow fadeInUp animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <figure className="image-box">
                  <Link href="/service-details-6">
                    <img src="assets/images/service/service-10.jpg" alt="" />
                  </Link>
                </figure>
                <div className="inner-box">
                  <div className="icon-box">
                    <i className="icon-17"></i>
                  </div>
                  <h4>
                    <Link href="/service-details-6">
                      AI and Machine Learning
                    </Link>
                  </h4>
                  <ul className="list-item clearfix">
                    <li>Learn Machine Learning and AI with projects.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specification;
