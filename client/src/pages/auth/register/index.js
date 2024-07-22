import React, { useState } from "react";
import AEButton from "../../../component/AEButton";
import { Link } from "react-router-dom";
import { color } from "../../../assets/css/color/color";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import {
  DENOMINATION_TYPES,
  GENDER_TYPE,
  MARITAL_STATUS,
} from "../../../constant";

export default function Register() {
  return (
    <>
      <div className="col-12 d-flex justify-content-center">
        <div className="wrap login-wrap p-4">
          <div className="d-flex pt-4">
            <div className="w-100">
              <h3 className="mb-4 text-center">Sign Up</h3>
            </div>
          </div>
          <div className="form-inner">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <AEInput placeholder="First Name" />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <AEInput placeholder="Last Name" />
              </div>
              <div className=" col-sm-12">
                <AEInput type="date" />
              </div>
              <div className="col-sm-12">
                <AESelect
                  placeholder="Gender"
                  options={GENDER_TYPE}
                  value={""}
                />
              </div>
              <div className="col-sm-12  ">
                <AESelect
                  placeholder="Marital Status"
                  options={MARITAL_STATUS}
                  value={""}
                />
              </div>
              <div className="col-sm-12  ">
                <AESelect
                  placeholder="Denomination"
                  options={DENOMINATION_TYPES}
                  value={""}
                />
              </div>
              <div className="col-lg-12  ">
                <AEInput placeholder="Phone Number" maxLength={10} />
              </div>
              <div className="col-lg-12">
                <AEInput placeholder="Password" maxLength={10} />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn centred pt-3">
                <AEButton
                  fullWidth
                  title="Submit "
                  //  isLoader={isLoader}
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
