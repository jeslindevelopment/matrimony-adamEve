import image from "../../../assets/images/why-us-bg.jpg";
export default function WhyUs() {
  return (
    <>
      <section
        id="whyUs"
        className="about-section pt_120 pb_120 wow fadeInRightBig animated"
      >
        <div className="pattern-layer rotate-me"></div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image_block_one">
                <div className="image-box pr_90 mr_40">
                  <figure className="image">
                    <img src={image} alt="" />
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_one">
                <div className="content-box ml_40">
                  <div className="sec-title mb_20 mt_20">
                    <h6>Why Choose Adam & Eve ? </h6>
                  </div>
                  <div className="text-box mb_40">
                    <p className="mt-1">
                      {/* Genuine Profiles | Safe & Secure | Detailed Family
                      Information */}
                      Bible says in Deut 7:3-4, Exo 34:12, Nehemiah 13:26-27, 2
                      Cor 6:14 that Believer must marry a believer. With the
                      rising numbers of cross cultural marriage in the body of
                      Christ is leading many to desperation and loss of peace.
                      In order to avoid such heartaches Adam N Eve Matrimony
                      provides its comprehensive database profiles.
                    </p>
                    <p className="mt-2">
                      We seek data only from Christians who believes on Jesus
                      Christ and who have a good report in their respective
                      churches.
                    </p>
                  </div>
                  <div className="inner-box mb_45">
                    <div className="single-item">
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h5>Purpose of ADAM N EVE MATRIMONY</h5>
                      <p className="mt-1">
                        The purpose behind this venture is to offer an
                        exhaustive array of profiles of marriageable individuals
                        to the body of believers. It also aims to minimize the
                        hassle of parents who travel to places looking for a
                        suitable bride / groom.
                      </p>
                    </div>
                    {/* <div className="single-item">
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>

                      <h5>
                        Community matches with detailed family information
                      </h5>
                      <p className="mt-1">
                        Feel at home with the right partner and family. With
                        over 80 community sites where each match is backed with
                        detailed family backgrounds.
                      </p>
                    </div>

                    <div className="single-item">
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h5>Enable your search without any barrier</h5>
                      <p className="mt-1">
                        Embark on your journey to find your perfect match now
                        available in multiple languages.
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
