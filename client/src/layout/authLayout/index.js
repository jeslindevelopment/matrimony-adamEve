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
            "url(https://www.southernliving.com/thmb/_DTHAquZBLEHKLIgPi_C3fFIhNo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-929904308-aeeb687413714dacace50062cece530a.jpg)",
          backgroundSize: "cover",
          minHeight: "100vh",
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
