import image from "../../../assets/images/1535303839A36I8979-Edit.jpg";
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
                    <img
                      // src={image}
                      src="https://www.brides.com/thmb/hJfQiJR2ayzZIUzpUtJTxl_14I0=/700x700/filters:no_upscale():max_bytes(150000):strip_icc()/shoegame-b0c204a63a454002b15ccc256154d291.jpg"
                      alt=""
                    />
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
                    <h6>
                      Genuine Profiles | Safe & Secure | Detailed Family
                      Information
                    </h6>
                  </div>
                  <div className="inner-box mb_45">
                    <div className="single-item">
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h5>Choose from government verified profiles</h5>
                      <p className="mt-1">
                        Feel safe, we manually verify authenticity of profiles
                        using government ID proofs like Pan card, Aadhar card,
                        Driving License
                      </p>
                    </div>
                    <div className="single-item">
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
                    </div>
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
