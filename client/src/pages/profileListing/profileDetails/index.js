import React, { useEffect } from "react";
import { color } from "../../../assets/css/color/color";
import "../index.css";
import DetailListBox from "./detailListBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetail } from "../../../store/slice/auth";
export default function ProfileDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileDetail } = useSelector((state) => state.auth);
  const { state } = useLocation();
  useEffect(() => {
    dispatch(getProfileDetail(state?.id));
  }, []);
  console.log("profileDetail", profileDetail);
  return (
    <>
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
                          src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                          class="img-fluid rounded-circle"
                          alt="Luna John"
                        />
                      </div>
                      <h5 class="text-center mb-1">{profileDetail?.firstname} {profileDetail?.surname}</h5>
                      <div class="d-grid m-0">
                        <button class="btn btn-outline-primary" type="button">
                          Follow
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
                      Ethan Leo is a seasoned and results-driven Project Manager
                      who brings experience and expertise to project management.
                      With a proven track record of successfully delivering
                      complex projects on time and within budget, Ethan Leo is
                      the go-to professional for organizations seeking efficient
                      and effective project leadership.{" "}
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
                        Ethan Leo is a seasoned and results-driven Project
                        Manager who brings experience and expertise to project
                        management. With a proven track record of successfully
                        delivering complex projects on time and within budget,
                        Ethan Leo is the go-to professional for organizations
                        seeking efficient and effective project leadership.
                      </p>
                      <h5 class="mb-3 mt-2">Profile</h5>
                      <div class="row g-0">
                        <DetailListBox title={"First Name"} text={""} />
                        <DetailListBox title={"Last Name"} text={""} />
                        <DetailListBox title={"DOB"} text={""} />
                        <DetailListBox title={"Gender"} text={""} />
                        <DetailListBox title={"Marital Status"} text={""} />
                        <DetailListBox title={"Denomination"} text={""} />
                        <DetailListBox title={"Phone Number"} text={""} />
                        <DetailListBox title={"Present City"} text={""} />
                        <DetailListBox title={"States"} text={""} />
                        <DetailListBox title={"Pin Code"} text={""} />
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
                        <DetailListBox title={"Height"} text={""} />
                        <DetailListBox title={"Weight"} text={""} />
                        <DetailListBox title={"Body Type"} text={""} />
                        <DetailListBox title={"Complexion "} text={""} />
                        <DetailListBox title={"Eating Habits"} text={""} />
                        <DetailListBox title={"Drink "} text={""} />
                        <DetailListBox title={"Smoke "} text={""} />
                        <DetailListBox title={"Education"} text={""} />
                        <DetailListBox title={"Blood Group"} text={""} />
                        <DetailListBox title={"Occupation "} text={""} />
                        <DetailListBox title={"Job Location "} text={""} />
                        <DetailListBox title={"Annual Income "} text={""} />
                        <DetailListBox title={"Designation  "} text={""} />
                        <DetailListBox title={"Mother Tongue "} text={""} />
                        <DetailListBox title={"Language Known "} text={""} />
                        <DetailListBox
                          title={"Disability (if Any)"}
                          text={""}
                        />
                        <DetailListBox
                          title={"Preferred Profiles from "}
                          text={""}
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
                        <DetailListBox title={"Name of Father"} text={""} />
                        <DetailListBox
                          title={"Father’s Occupation"}
                          text={""}
                        />
                        <DetailListBox title={"Name of Mother"} text={""} />
                        <DetailListBox
                          title={"Mother’s Occupation"}
                          text={""}
                        />
                        <DetailListBox title={"No. of Brother"} text={""} />
                        <DetailListBox title={"No. of Sister"} text={""} />
                        <DetailListBox
                          title={"Contact No. of Parent"}
                          text={""}
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
                        <DetailListBox title={"Name of Church"} text={""} />
                        <DetailListBox
                          title={"Name of Church Priest"}
                          text={""}
                        />
                        <DetailListBox
                          title={"Pastors Contact No."}
                          text={""}
                        />
                        <DetailListBox title={"Church Address"} text={""} />
                        <DetailListBox title={"Year of Baptism"} text={""} />
                        <DetailListBox title={"Ministry if Any"} text={""} />
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
