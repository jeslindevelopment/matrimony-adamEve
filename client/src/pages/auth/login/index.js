import React from "react";
import AEButton from "../../../component/AEButton";
import { Link } from "react-router-dom";
import { color } from "../../../assets/css/color/color";
import AEInput from "../../../component/AEInput";

export default function Login() {
  return (
    <>
      <div className=" col-md-12 col-lg-10 d-flex justify-content-center">
        <div className="wrap login-wrap p-4">
          <div className="d-flex pt-4">
            <div className="w-100">
              <h3 className="mb-4 text-center">Sign In</h3>
            </div>
          </div>
          <div className="form-inner">
            <div className="row clearfix">
              <div className="col-lg-12">
                <AEInput placeholder="Phone Number" maxLength={10} />
              </div>
              <div className="col-lg-12">
                <AEInput placeholder="Password" maxLength={50} />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred">
                <AEButton
                  fullWidth
                  title="Login "
                //  isLoader={isLoader}
                />
              </div>

              <div className="form-group d-flex justify-content-end pt-1">
                <div className="">
                  <Link
                    className="fw-bolder"
                    to="/auth/forgotPassword"
                    style={{ color: color.hightLightColor }}
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center pt-4">
            Not a member ?{" "}
            <Link to="/auth/register" style={{ color: color.hightLightColor }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
