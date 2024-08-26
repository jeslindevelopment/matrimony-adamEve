import React, { useContext } from "react";
import { UserContext } from "../../../../../components/userContext";
import AEButton from "../../../../../components/AEButton";

export default function Details() {
  const { setFormData, formData, handleSave, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <textarea
            class="form-control"
            aria-label="With textarea"
            value={formData?.selfDescrreq}
            onChange={(e) => {
              setFormData({
                ...formData,
                selfDescrreq: e.target.value,
              });
            }}
            placeholder="About yourself"
            style={{ background: "#b99a4570" }}
          />
        </div>
        <div className="col-12 mt-3">
          <textarea
            class="form-control"
            value={formData?.partnersExpectations}
            onChange={(e) => {
              setFormData({
                ...formData,
                partnersExpectations: e.target.value,
              });
            }}
            aria-label="With textarea"
            placeholder=" Partners expectations "
            style={{ background: "#b99a4570" }}
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
              title="Save "
              onClick={handleSave}
            //  isLoader={isLoader}
            />
          </div>
        </div>
      </div>
    </>
  );
}
