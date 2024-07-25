import React from "react";
import { color } from "../../../assets/css/color/color";
import { Link } from "react-router-dom";

export default function LookingFor() {
  return (
    // <section
    //   id="about"
    //   className="service-section pt_60 pb_60 wow fadeInLeftBig animated"
    // >
    //   <div
    //     className="bg-layer"
    //     style={
    //       {
    //         // backgroundImage: `url(${image})`,
    //       }
    //     }
    //   ></div>
    //   <div className="auto-container">
    //     <div className="sec-title centred mb_60">
    //       <h6>Looking For</h6>
    //     </div>
    //     <div className="row clearfix">
    //       <div className="col-lg-6 col-md-6 col-sm-12 service-block">
    //         <div
    //           className="service-block-one wow fadeInUp animated"
    //           data-wow-delay="00ms"
    //           data-wow-duration="1500ms"
    //         >
    //           <figure className="grow img">
    //             <img
    //               src="https://t3.ftcdn.net/jpg/02/35/77/68/360_F_235776829_skf3a0OpCK6GW40v0nsd8Pz9Y4dFGjiz.jpg"
    //               alt=""
    //             />
    //           </figure>
    //           <div className="text-center pt-3">
    //             <h4>Bride</h4>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-lg-6 col-md-6 col-sm-12 service-block">
    //         <div
    //           className="service-block-one wow fadeInUp animated"
    //           data-wow-delay="00ms"
    //           data-wow-duration="1500ms"
    //         >
    //           <figure className="grow img">
    //             <img
    //               src="https://t3.ftcdn.net/jpg/02/35/77/68/360_F_235776829_skf3a0OpCK6GW40v0nsd8Pz9Y4dFGjiz.jpg"
    //               alt=""
    //             />
    //           </figure>
    //         </div>
    //         <div className="text-center pt-3">
    //           <h4>Groom</h4>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
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
                        src="https://t3.ftcdn.net/jpg/02/35/77/68/360_F_235776829_skf3a0OpCK6GW40v0nsd8Pz9Y4dFGjiz.jpg"
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
                        src="https://img.freepik.com/free-photo/stylish-groom_1157-13809.jpg"
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
