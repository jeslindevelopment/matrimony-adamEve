import React, { useContext } from "react";
import { UserContext } from "../../../../../components/userContext";
import AEInput from "../../../../../components/AEInput";
import AESelect from "../../../../../components/AESelect";
import { MINISTRY } from "../../../../../constant";
import AEButton from "../../../../../components/AEButton";

export default function ChurchInfo() {
  const { setFormData, formData, handleNext, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.churchName}
            onChange={(e) => {
              setFormData({
                ...formData,
                churchName: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Name of Church"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.churchPriest}
            onChange={(e) => {
              setFormData({
                ...formData,
                churchPriest: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Name of Church Priest"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.churchAddress}
            onChange={(e) => {
              setFormData({
                ...formData,
                churchAddress: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Church Address"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.yearOfBaptism}
            onChange={(e) => {
              setFormData({
                ...formData,
                yearOfBaptism: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Year of Baptism"
          />
        </div>{" "}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.pastorsContact}
            onChange={(e) => {
              setFormData({
                ...formData,
                pastorsContact: e.target.value?.slice(0, 10),
              });
            }}
            background="#b99a4570"
            placeholder="Pastors Contact No."
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Ministry if Any"
            options={MINISTRY}
            value={formData?.ministry}
            onChange={(e) => {
              setFormData({
                ...formData,
                ministry: e.target.value,
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
