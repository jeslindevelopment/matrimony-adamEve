import React, { useState } from "react";
import AEButton from "../../../component/AEButton";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../../../assets/css/color/color";
import AEInput from "../../../component/AEInput";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { userlogin } from "../../../store/slice/auth";
export default function Login() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!formData?.phone) {
      setFormData({ ...formData, phoneErr: "Please enter your phone number" });
      return;
    }
    if (formData?.phone?.length < 10) {
      setFormData({ ...formData, phoneErr: "Please enter valid phone number" });
      return;
    }
    if (!formData?.password) {
      setFormData({ ...formData, passwordErr: "Please enter your password" });
      return;
    }
    setIsLoading(true);
    let request = {
      phone: formData?.phone,
      password: formData?.password,
    };
    dispatch(userlogin(request, setIsLoading, navigate));
  };
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
                <AEInput
                  type="number"
                  formErr={formData?.phoneErr}
                  value={formData?.phone}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      phone: e.target.value.slice(0, 10),
                      phoneErr: "",
                    });
                  }}
                  placeholder="Phone Number"
                />
              </div>
              <div className="col-lg-12">
                <AEInput
                  formErr={formData?.passwordErr}
                  placeholder="Password"
                  endText={
                    <Icon
                      icon={
                        formData?.showPass
                          ? "lets-icons:eye-light"
                          : "iconamoon:eye-off-light"
                      }
                      color="black"
                      width={25}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          showPass: !formData?.showPass,
                        })
                      }
                    />
                  }
                  type={formData?.showPass ? "text" : "password"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                      passwordErr: "",
                    });
                  }}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred">
                <AEButton
                  fullWidth
                  title="Login "
                  onClick={handleLogin}
                  isLoader={isLoading}
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
