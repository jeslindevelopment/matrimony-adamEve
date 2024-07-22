import React, { useContext } from "react";
import { UserContext } from "../../../component/userContext";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import {
    MINISTRY
} from "../../../constant";
import AEButton from "../../../component/AEButton";

export default function ChurchInfo() {
  const { setFormData, formData, handleNext, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Name of Church" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Name of Church Priest" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Church Address" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Year of Baptism" />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput background="#b99a4570" placeholder="Pastors Contact No." />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Ministry if Any"
            options={MINISTRY}
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
