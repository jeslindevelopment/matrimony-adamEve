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
  const { setFormData, formData, handleNext ,handlePrevious} = useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Height"
            options={HEIGHT}
            value={""}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            placeholder="Weight"
            endIcon
            endText="KG"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Body Type"
            options={BODY_TYPES}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Complexion "
            options={COMPLEXION}
            value={""}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Eating Habits"
            options={EATING_HABIT}
            value={""}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Smoke"
            options={SMOKE}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Drink"
            options={DRINK}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Education "
            options={HIGHEST_EDUCATION}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AEInput background="#b99a4570" placeholder="Specialization " />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12   ">
          <AESelect
            background="#b99a4570"
            placeholder="Blood Group"
            options={BLOOD_GROUP}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Occupation  "
            options={OCCUPATION}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Job Location" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Annual Income"
            options={ANNUAL_INCOME}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Designation " />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Mother Tongue " />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Language Known " />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Disability (if Any)" />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Preferred Profiles from which (State)"
            options={INDIAN_STATES}
            value={""}
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
