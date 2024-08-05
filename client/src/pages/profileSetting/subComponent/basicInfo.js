import React, { useContext } from "react";
import { UserContext } from "../../../component/userContext";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import {
  DENOMINATION_TYPES,
  GENDER_TYPE,
  INDIAN_STATES,
  MARITAL_STATUS,
} from "../../../constant";
import AEButton from "../../../component/AEButton";

export default function BasicInfo() {
  const { setFormData, formData, handleNext } = useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.firstname}
            onChange={(e) => {
              setFormData({
                ...formData,
                firstname: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="First  Name"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.surname}
            onChange={(e) => {
              setFormData({
                ...formData,
                surname: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Surname"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            type="date"
            value={formData?.dob}
            onChange={(e) => {
              setFormData({
                ...formData,
                dob: e.target.value,
              });
            }}
            placeholder="Date of Birth"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Gender"
            value={formData?.gender}
            onChange={(e) => {
              setFormData({
                ...formData,
                gender: e.target.value,
              });
            }}
            options={GENDER_TYPE}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Marital Status"
            options={MARITAL_STATUS}
            value={formData?.maritalStatus}
            onChange={(e) => {
              setFormData({
                ...formData,
                maritalStatus: e.target.value,
              });
            }}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Denomination"
            options={DENOMINATION_TYPES}
            value={formData?.denomination}
            onChange={(e) => {
              setFormData({
                ...formData,
                denomination: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            placeholder="Phone Number"
            maxLength={10}
            value={formData?.phone}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone: e.target.value.slice(0, 10),
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12W ">
          <AEInput
            value={formData?.city}
            onChange={(e) => {
              setFormData({
                ...formData,
                city: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Present City "
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            value={formData?.state}
            onChange={(e) => {
              setFormData({
                ...formData,
                state: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="States"
            options={INDIAN_STATES}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.pincode}
            onChange={(e) => {
              setFormData({
                ...formData,
                pincode: e.target.value.slice(0, 6),

              });
            }}
            background="#b99a4570"
            placeholder="Pin Code "
          />
        </div>
      </div>
      <div className="row py-4">
        <div className="d-flex justify-content-end">
          <div>
            <AEButton
              fullWidth
              title="Next "
              onClick={handleNext}
              //  isLoader={isLoader}
            />
          </div>
        </div>
      </div>
    </>
  );
}
