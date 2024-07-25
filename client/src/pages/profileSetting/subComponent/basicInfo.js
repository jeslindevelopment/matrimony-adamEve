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
  const { setFormData, formData,handleNext } = useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="First  Name" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Surname" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            type="date"
            placeholder="Date of Birth"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Gender"
            options={GENDER_TYPE}
            value={""}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Marital Status"
            options={MARITAL_STATUS}
            value={""}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AESelect
            background="#b99a4570"
            placeholder="Denomination"
            options={DENOMINATION_TYPES}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            placeholder="Phone Number"
            maxLength={10}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12W ">
          <AEInput background="#b99a4570" placeholder="Present City " />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="States"
            options={INDIAN_STATES}
            value={""}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AEInput background="#b99a4570" placeholder="Pin Code " />
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
