import { Outlet } from "react-router-dom";
// @mui
// components
import "./index.css";
import Logo from "../../component/logo";
export default function AuthLayout() {
  return (
    <>
      <div
        style={{
          //   background: "#b99a45",
          backgroundImage:
            "url(https://www.betterup.com/hs-fs/hubfs/husband-and-wife-newly-weds-taking-hands.jpg?width=800&height=551&name=husband-and-wife-newly-weds-taking-hands.jpg)",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section class="ftco-section">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-6 text-center mb-5">
                <h2 class="heading-section">
                  <Logo />
                </h2>
              </div>
            </div>
            <div class="row d-flex  justify-content-center">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
