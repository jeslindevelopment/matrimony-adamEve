import React, { useContext } from "react";
import { UserContext } from "../../../component/userContext";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import {
  ANNUAL_INCOME,
  BLOOD_GROUP,
  BODY_TYPES,
  COMPLEXION,
  DRINK,
  EATING_HABIT,
  HEIGHT,
  HIGHEST_EDUCATION,
  INDIAN_STATES,
  OCCUPATION,
  SMOKE,
} from "../../../constant";
import AEButton from "../../../component/AEButton";

export default function PersonalInfo() {
  const { setFormData, formData, handleNext, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Height"
            options={HEIGHT}
            value={formData?.height}
            onChange={(e) => {
              setFormData({
                ...formData,
                height: e.target.value,
              });
            }}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            placeholder="Weight"
            endIcon
            value={formData?.weight}
            onChange={(e) => {
              setFormData({
                ...formData,
                weight: e.target.value,
              });
            }}
            endText="KG"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Body Type"
            options={BODY_TYPES}
            value={formData?.bodyType}
            onChange={(e) => {
              setFormData({
                ...formData,
                bodyType: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Complexion "
            options={COMPLEXION}
            value={formData?.complexion}
            onChange={(e) => {
              setFormData({
                ...formData,
                complexion: e.target.value,
              });
            }}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Eating Habits"
            options={EATING_HABIT}
            value={formData?.eatingHabits}
            onChange={(e) => {
              setFormData({
                ...formData,
                eatingHabits: e.target.value,
              });
            }}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Smoke"
            options={SMOKE}
            value={formData?.smoke}
            onChange={(e) => {
              setFormData({
                ...formData,
                smoke: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Drink"
            options={DRINK}
            value={formData?.drink}
            onChange={(e) => {
              setFormData({
                ...formData,
                drink: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Education "
            options={HIGHEST_EDUCATION}
            value={formData?.education}
            onChange={(e) => {
              setFormData({
                ...formData,
                education: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AEInput
            value={formData?.specialization}
            onChange={(e) => {
              setFormData({
                ...formData,
                specialization: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Specialization "
          />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Blood Group"
            options={BLOOD_GROUP}
            value={formData?.bloodGroup}
            onChange={(e) => {
              setFormData({
                ...formData,
                bloodGroup: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Occupation  "
            options={OCCUPATION}
            value={formData?.occupation}
            onChange={(e) => {
              setFormData({
                ...formData,
                occupation: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.jobLocation}
            onChange={(e) => {
              setFormData({
                ...formData,
                jobLocation: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Job Location"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Annual Income"
            options={ANNUAL_INCOME}
            value={formData?.annualIncome}
            onChange={(e) => {
              setFormData({
                ...formData,
                annualIncome: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.designation}
            onChange={(e) => {
              setFormData({
                ...formData,
                designation: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Designation "
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.motherTongue}
            onChange={(e) => {
              setFormData({
                ...formData,
                motherTongue: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Mother Tongue "
          />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.language}
            onChange={(e) => {
              setFormData({
                ...formData,
                language: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Language Known "
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput
            value={formData?.disability}
            onChange={(e) => {
              setFormData({
                ...formData,
                disability: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Disability (if Any)"
          />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Preferred Profiles from which (State)"
            options={INDIAN_STATES}
            value={formData?.preferredProfilesState}
            onChange={(e) => {
              setFormData({
                ...formData,
                preferredProfilesState: e.target.value,
              });
            }}
          />{" "}
        </div>
      </div>
      <div className="row py-4">
        <div className="d-flex justify-content-between">
          <div>
            <AEButton
              fullWidth
              title="Previous "
              onClick={handlePrevious}
              //  isLoader={isLoader}
            />
          </div>
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
