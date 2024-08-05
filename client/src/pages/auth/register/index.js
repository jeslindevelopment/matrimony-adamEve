import React, { useState } from "react";
import AEButton from "../../../component/AEButton";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../../../assets/css/color/color";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import {
  DENOMINATION_TYPES,
  GENDER_TYPE,
  MARITAL_STATUS,
} from "../../../constant";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/slice/auth";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = () => {
    if (!formData?.firstName) {
      setFormData({ ...formData, firstNameErr: "Please enter first name" });
      return;
    }
    if (!formData?.lastName) {
      setFormData({ ...formData, lastNameErr: "Please enter last name" });
      return;
    }
    if (!formData?.date) {
      setFormData({ ...formData, dateErr: "Please enter date of birth" });
      return;
    }
    if (!formData?.gender) {
      setFormData({ ...formData, genderErr: "Please select gender" });
      return;
    }
    if (!formData?.marital) {
      setFormData({ ...formData, maritalErr: "Please select marital status" });
      return;
    }
    if (!formData?.denomination) {
      setFormData({
        ...formData,
        denominationErr: "Please select denomination",
      });
      return;
    }
    if (!formData?.phone) {
      setFormData({ ...formData, phoneErr: "Please enter phone number" });
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
    setIsLoading(true)
    let request = {
      password: formData?.password,
      firstname: formData?.firstName,
      surname: formData?.lastName,
      dob: formData?.date,
      gender: formData?.gender,
      maritalStatus: formData?.marital,
      phone: formData?.phone,
      denomination: formData?.denomination,
    };
    dispatch(signUp(request,setIsLoading,navigate))
  };
  return (
    <>
      <div
        className="col-12 d-flex justify-content-center"
        style={{ paddingBottom: "3rem" }}
      >
        <div className="wrap login-wrap p-4">
          <div className="d-flex pt-4">
            <div className="w-100">
              <h3 className="mb-4 text-center">Sign Up</h3>
            </div>
          </div>
          <div className="form-inner">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <AEInput
                  formErr={formData?.firstNameErr}
                  value={formData?.firstName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                      firstNameErr: "",
                    });
                  }}
                  placeholder="First Name"
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <AEInput
                  formErr={formData?.lastNameErr}
                  value={formData?.lastName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                      lastNameErr: "",
                    });
                  }}
                  placeholder="Last Name"
                />
              </div>
              <div className=" col-sm-12">
                <AEInput
                  type="date"
                  formErr={formData?.dateErr}
                  value={formData?.date}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      date: e.target.value,
                      dateErr: "",
                    });
                  }}
                />
              </div>
              <div className="col-sm-12">
                <AESelect
                  placeholder="Gender"
                  formErr={formData?.genderErr}
                  value={formData?.gender}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                      genderErr: "",
                    });
                  }}
                  options={GENDER_TYPE}
                />
              </div>
              <div className="col-sm-12  ">
                <AESelect
                  placeholder="Marital Status"
                  options={MARITAL_STATUS}
                  formErr={formData?.maritalErr}
                  value={formData?.marital}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      marital: e.target.value,
                      maritalErr: "",
                    });
                  }}
                />
              </div>
              <div className="col-sm-12  ">
                <AESelect
                  placeholder="Denomination"
                  options={DENOMINATION_TYPES}
                  formErr={formData?.denominationErr}
                  value={formData?.denomination}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      denomination: e.target.value,
                      denominationErr: "",
                    });
                  }}
                />
              </div>
              <div className="col-lg-12  ">
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

              <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred pt-3">
                <AEButton
                  fullWidth
                  title="Submit "
                  onClick={handleRegister}
                   isLoader={isLoading}
                />
              </div>
            </div>
          </div>

          <p className="text-center pt-4">
            Already a member ?{" "}
            <Link to="/auth/login" style={{ color: color.hightLightColor }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
      :
    </>
  );
}
