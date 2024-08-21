import image from "../../../assets/images/abous-us-bg.jpg";
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
              <p style={{ fontSize: 20, lineHeight: 1.5, color: "black" }}>
                Established on 03 June 2015, Adam N Eve Matrimony came into
                existence with the motive to serve the people of God. The
                founder Pastor Patrick Peter came face to face with the ground
                reality and plight of the believers as they struggle to find a
                believer life partner. The burden for the unmarried believers
                was very strong in his mind and once a man approached him in
                Rajasthan with tears in his eyes and expressed his helplessness
                in finding a right life partner for his sister. The immediate
                response from Pastor Patrick’s heart was <span className="fw-bolder">
                   “Lord what can I do for
                these people” </span>. Not being hasty he consulted several pastors and
                leaders regarding his burden and most of them offered positive
                response. The next issue that confronted him was that of finance
                for this venture. Miraculously this need was supplied and Adam N
                Eve Matrimony came into existence.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
