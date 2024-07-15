import { useEffect, useState } from "react";
import BackToTop from "../../component/BackToTop";
import DataBg from "../../component/DataBg";
import Header from "./header";
import Sidebar from "./Sidebar";

export default function LandingPageLayout({ Children, wrapperCls }) {
  const [scroll, setScroll] = useState(0);
  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-visible")
      : document.body.classList.remove("mobile-menu-visible");
  };

  // Popup
  const [isPopup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!isPopup);

  // Sidebar
  const [isSidebar, setSidebar] = useState(false);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);
  return (
    <>
      <DataBg />
      <div
        className={`boxed_wrapper ltr${wrapperCls ? wrapperCls : ""}`}
        id="#top"
      >
        <Header
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          handlePopup={handlePopup}
          isSidebar={isSidebar}
          handleSidebar={handleSidebar}
        />

        <Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />
        {Children}
        {/* {!footerStyle && <Footer1 />}
        {footerStyle == 1 ? <Footer1 /> : null} */}
      </div>
      <BackToTop scroll={scroll} />
    </>
  );
}
