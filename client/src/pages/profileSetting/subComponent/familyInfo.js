import React, { useContext } from "react";
import { UserContext } from "../../../component/userContext";
import AEInput from "../../../component/AEInput";
import AESelect from "../../../component/AESelect";
import { FATHER_OCCUPATION, MOTHER_OCCUPATION } from "../../../constant";
import AEButton from "../../../component/AEButton";

export default function FamilyInfo() {
  const { setFormData, formData, handleNext, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.fatherName}
            onChange={(e) => {
              setFormData({
                ...formData,
                fatherName: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Name Of Father"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.motherName}
            onChange={(e) => {
              setFormData({
                ...formData,
                motherName: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Name Of Mother"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.numberOfBrother}
            onChange={(e) => {
              setFormData({
                ...formData,
                numberOfBrother: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Number Of Brother"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            value={formData?.numberOfSister}
            onChange={(e) => {
              setFormData({
                ...formData,
                numberOfSister: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Number Of Sister"
          />
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            value={formData?.fatherOccupation}
            onChange={(e) => {
              setFormData({
                ...formData,
                fatherOccupation: e.target.value,
              });
            }}
            background="#b99a4570"
            placeholder="Father’s Occupation"
            options={FATHER_OCCUPATION}
          />{" "}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <AESelect
            background="#b99a4570"
            placeholder="Mother’s Occupation"
            options={MOTHER_OCCUPATION}
            value={formData?.motherOccupation}
            onChange={(e) => {
              setFormData({
                ...formData,
                motherOccupation: e.target.value,
              });
            }}
          />{" "}
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <AEInput
            background="#b99a4570"
            placeholder="Alternate Contact No. Of Parent"
            type='number'
            value={formData?.parentContact}
            onChange={(e) => {
              setFormData({
                ...formData,
                parentContact: e.target.value?.slice(0, 10),
              });
            }}
          />
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
