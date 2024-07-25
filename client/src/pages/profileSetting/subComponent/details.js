import React, { useContext } from "react";
import { UserContext } from "../../../component/userContext";
import AEButton from "../../../component/AEButton";

export default function Details() {
  const { setFormData, formData, handleNext, handlePrevious } =
    useContext(UserContext);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="About yourself"
            style={{ background: "#b99a4570" }}
          />
        </div>
        <div className="col-12 mt-3">
          <textarea
            class="form-control"
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