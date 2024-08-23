import React, { useEffect, useState } from "react";
import { color } from "../../../assets/css/color/color";
import "../index.css";
import DetailListBox from "./detailListBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getProfileDetail } from "../../../store/slice/auth";
import noImage from "../../../assets/images/no-image.jpg";
import moment from "moment";
import SendInterestDialog from "../sendInterest";

export default function ProfileDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileDetail } = useSelector((state) => state.auth);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    dispatch(getProfileDetail(state?.id));
  }, []);
  return (
    <>
      <SendInterestDialog
        id={state?.id}
        showDialog={showInterestDialog}
        handleCloseDialog={() => setShowInterestDialog(false)}
      />
      <section class="bg-light py-3 py-md-5 py-xl-8">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li
                class="breadcrumb-item fw-bolder"
                style={{ cursor: "pointer" }}
              >
                <a onClick={() => navigate(-1)}>Back</a>
              </li>
            </ol>
          </nav>
        </div>
        <div class="container ">
          <div class="row gy-4 gy-lg-0">
            <div class="col-12 col-lg-4 col-xl-3">
              <div class="row gy-4">
                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div
                      class="card-header text-white fs-6 fw-bolder"
                      style={{ background: color.hightLightColor }}
                    >
                      Welcome, {profileDetail?.firstname}
                    </div>
                    <div class="card-body">
                      <div class="text-center mb-3">
                        <img
                          src={noImage}
                          class="img-fluid rounded-circle"
                          alt="Luna John"
                        />
                      </div>
                      <h5 class="text-center mb-1">
                        {profileDetail?.firstname} {profileDetail?.surname}
                      </h5>
                      <div class="d-grid m-0">
                        <button
                          type="button"
                          class="btn"
                          onClick={() => setShowInterestDialog(true)}
                          style={{
                            background: color.hightLightColor,
                            borderRadius: 10,
                            height: 40,
                            marginTop: "0.5rem",
                            color: "white",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Send Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div
                      class="card-header text-white fs-6 fw-bolder"
                      style={{ background: color.hightLightColor }}
                    >
                      Expectation for partner
                    </div>
                    <div class="card-body fs-6 fw-bolder">
                      {profileDetail?.partnersExpectations
                        ? profileDetail?.partnersExpectations
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-8 col-xl-9">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-body p-4">
                  <ul class="nav nav-tabs" id="profileTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="overview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#overview-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="overview-tab-pane"
                        aria-selected="true"
                      >
                        Basic Info
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="profile-tab-pane"
                        aria-selected="false"
                      >
                        Personal Info
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="email-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#email-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="email-tab-pane"
                        aria-selected="false"
                      >
                        Family Info
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="password-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#password-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="password-tab-pane"
                        aria-selected="false"
                      >
                        Church Info
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content pt-4" id="profileTabContent">
                    {/* basic info */}
                    <div
                      class="tab-pane fade show active"
                      id="overview-tab-pane"
                      role="tabpanel"
                      aria-labelledby="overview-tab"
                      tabindex="0"
                    >
                      <h5 class="mb-3">About</h5>
                      <p class="lead mb-3 fs-6 fw-bolder">
                        {profileDetail?.selfDescription
                          ? profileDetail?.selfDescription
                          : "N/A"}
                      </p>
                      <h5 class="mb-3 mt-2">Profile</h5>
                      <div class="row g-0">
                        <DetailListBox
                          title={"First Name"}
                          text={profileDetail?.firstname}
                        />
                        <DetailListBox
                          title={"Last Name"}
                          text={profileDetail?.surname}
                        />
                        <DetailListBox
                          title={"DOB"}
                          text={moment(profileDetail?.dob).format("DD-MM-YYYY")}
                        />
                        <DetailListBox
                          title={"Gender"}
                          text={profileDetail?.gender}
                        />
                        <DetailListBox
                          title={"Marital Status"}
                          text={profileDetail?.maritalStatus}
                        />
                        <DetailListBox
                          title={"Denomination"}
                          text={profileDetail?.denomination}
                        />
                        <DetailListBox
                          title={"Phone Number"}
                          text={profileDetail?.phone}
                        />
                        <DetailListBox
                          title={"City"}
                          text={profileDetail?.city}
                        />
                        <DetailListBox
                          title={"States"}
                          text={profileDetail?.state}
                        />
                        <DetailListBox
                          title={"Pin Code"}
                          text={profileDetail?.pincode}
                        />
                      </div>
                    </div>
                    {/* personal info */}
                    <div
                      class="tab-pane fade"
                      id="profile-tab-pane"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                      tabindex="0"
                    >
                      <div class="row g-0">
                        <DetailListBox
                          title={"Height"}
                          text={profileDetail?.height}
                        />
                        <DetailListBox
                          title={"Weight"}
                          text={profileDetail?.weight}
                        />
                        <DetailListBox
                          title={"Body Type"}
                          text={profileDetail?.bodyType}
                        />
                        <DetailListBox
                          title={"Complexion "}
                          text={profileDetail?.complexion}
                        />
                        <DetailListBox
                          title={"Eating Habits"}
                          text={profileDetail?.eatingHabits}
                        />
                        <DetailListBox
                          title={"Drink "}
                          text={profileDetail?.drink}
                        />
                        <DetailListBox
                          title={"Smoke "}
                          text={profileDetail?.smoke}
                        />
                        <DetailListBox
                          title={"Education"}
                          text={profileDetail?.education}
                        />
                        <DetailListBox
                          title={"Blood Group"}
                          text={profileDetail?.bloodGroup}
                        />
                        <DetailListBox
                          title={"Occupation "}
                          text={profileDetail?.occupation}
                        />
                        <DetailListBox
                          title={"Job Location "}
                          text={profileDetail?.jobLocation}
                        />
                        <DetailListBox
                          title={"Annual Income "}
                          text={profileDetail?.annualIncome}
                        />
                        <DetailListBox
                          title={"Designation  "}
                          text={profileDetail?.designation}
                        />
                        <DetailListBox
                          title={"Mother Tongue "}
                          text={profileDetail?.motherTongue}
                        />
                        <DetailListBox
                          title={"Language Known "}
                          text={profileDetail?.language}
                        />
                        <DetailListBox
                          title={"Disability (if Any)"}
                          text={profileDetail?.disability}
                        />
                        <DetailListBox
                          title={"Preferred Profiles from "}
                          text={profileDetail?.preferredProfilesState}
                        />
                      </div>
                    </div>
                    {/* family info */}
                    <div
                      class="tab-pane fade"
                      id="email-tab-pane"
                      role="tabpanel"
                      aria-labelledby="email-tab"
                      tabindex="0"
                    >
                      <div class="row g-0">
                        <DetailListBox
                          title={"Name of Father"}
                          text={profileDetail?.fatherName}
                        />
                        <DetailListBox
                          title={"Father’s Occupation"}
                          text={profileDetail?.fatherOccupation}
                        />
                        <DetailListBox
                          title={"Name of Mother"}
                          text={profileDetail?.motherName}
                        />
                        <DetailListBox
                          title={"Mother’s Occupation"}
                          text={profileDetail?.motherOccupation}
                        />
                        <DetailListBox
                          title={"No. of Brother"}
                          text={profileDetail?.numberOfBrother}
                        />
                        <DetailListBox
                          title={"No. of Sister"}
                          text={profileDetail?.numberOfSister}
                        />
                        <DetailListBox
                          title={"Contact No. of Parent"}
                          text={profileDetail?.parentContact}
                        />
                      </div>
                    </div>
                    {/* church info */}
                    <div
                      class="tab-pane fade"
                      id="password-tab-pane"
                      role="tabpanel"
                      aria-labelledby="password-tab"
                      tabindex="0"
                    >
                      <div class="row g-0">
                        <DetailListBox
                          title={"Name of Church"}
                          text={profileDetail?.churchName}
                        />
                        <DetailListBox
                          title={"Name of Church Priest"}
                          text={profileDetail?.churchPriest}
                        />
                        <DetailListBox
                          title={"Pastors Contact No."}
                          text={profileDetail?.pastorsContact}
                        />
                        <DetailListBox
                          title={"Church Address"}
                          text={profileDetail?.churchAddress}
                        />
                        <DetailListBox
                          title={"Year of Baptism"}
                          text={profileDetail?.yearOfBaptism}
                        />
                        <DetailListBox
                          title={"Ministry if Any"}
                          text={profileDetail?.ministry}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
