import image from "../../../assets/images/Candid-Wedding-Photography-Coimbatore-2.png";
export default function AboutUs() {
  return (
    <>
      <section
        id="about"
        className="service-section pt_120 pb_120 wow fadeInLeftBig animated"
      >
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="auto-container">
          <div className="sec-title centred mb_60">
            <h6>About Us</h6>
          </div>
          <div
            className="service-block-one wow fadeInUpBig animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <div className="text-center">
              <p style={{ fontSize: 25, lineHeight: 1.5,color:'black' }}>
                Adam & Eve is a trusted matchmaking service created for peoples
                who are looking for a life partner for their self or loved ones.
                Unlike other Matrimonial services, we focus on providing
                trustworthy detailed family and background information to help
                you take the next step with confidence. With over 80+ community
                sites, you can find a match from your own community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
