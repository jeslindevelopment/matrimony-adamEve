import image from "../assets/images/back-to-top.png";
export default function BackToTop({ scroll }) {
  return (
    <>
      {scroll && (
        <a className="scroll-to-top scroll-to-target d-block" href="#top">
          <div className="">
            <img src={image} alt="" width={"50px"} />
          </div>
        </a>
      )}
    </>
  );
}
