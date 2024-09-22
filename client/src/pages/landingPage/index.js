import React, { useEffect } from "react";
import LandingPageLayout from "../../layout/landingPage/landingPageLayout";
import Contact from "./subComponent/contact.js";
import Banner from "./subComponent/Banner.js";
import WhyUs from "./subComponent/whyUs.js";
import AboutUs from "./subComponent/AbousUs.js";
import Process from "./subComponent/process.js";
import LookingFor from "./subComponent/lookingFor.js";
import OurTeam from "./subComponent/ourTeam.js";
import PayUCheckout from "../payment/paymentSetup.js"
export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Banner />
      <LookingFor />
      <WhyUs />
      <Process />
      <AboutUs />
      <OurTeam />
      <PayUCheckout  />
      <Contact />
    </>
  );
}
