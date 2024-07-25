import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImage1 from "../../../assets/images/banner-image-1.jpg";
import BannerImage2 from "../../../assets/images/banner-image-2.jpg";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  // navigation: {
  //   nextEl: ".h1n",
  //   prevEl: ".h1p",
  // },

  // Pagination
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
};

export default function Banner() {
  return (
    <>
      <section id="banner" className="banner-section p_relative">
        <Swiper {...swiperOptions} className="banner-carousel">
          <SwiperSlide className="slide-item p_relative">
            <div
              className="bg-layer"
              style={{ backgroundImage: `url(${BannerImage1})` }}
            ></div>

            <div className="auto-container">
              <div className="content-box">
                <h2>
                  Find Your  <span>Soulmate </span> <br/>
                  Here
                </h2>
                <p>
                  HE WHO FINDS A WIFE FINDS A GOOD THINGS AND OBTAINS FAVOUR
                  FROM THE LORD
                </p>
                <div className="btn-box">
                  <Link href="/" className="theme-btn btn-one">
                    Find Your Partner
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide-item p_relative">
            <div
              className="bg-layer"
              style={{ backgroundImage: `url(${BannerImage2})` }}
            ></div>

            <div className="auto-container">
              <div className="content-box">
              <h2>
                  Find Your  <span>Soulmate </span> <br/>
                  Here
                </h2>
                <p>
                  HE WHO FINDS A WIFE FINDS A GOOD THINGS AND OBTAINS FAVOUR
                  FROM THE LORD
                </p>
                <div className="btn-box">
                  <Link href="/" className="theme-btn btn-one">
                    Find Your Partner{" "}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}


