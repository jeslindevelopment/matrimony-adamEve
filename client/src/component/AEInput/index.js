import React from "react";

export default function AEInput(props) {
  const {
    formErr,
    placeholder,
    type,
    onChange,
    value,
    maxLength,
    background,
    endText,
    max,
  } = props;
  return (
    <>
      <div className="input-group mb-3">
        <input
          type={type ? type : "text"}
          className="form-control"
          placeholder={placeholder}
          max={max}
          style={{ background: background ? background : "", fontWeight: 500 }}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
        {endText && (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                background: background ? background : "",
                fontWeight: 600,
              }}
            >
              {endText}
            </span>
          </div>
        )}
      </div>
      {formErr && (
        <p
          style={{
            fontSize: 13,
            marginTop: "-1rem",
            marginBottom: "1rem",
            marginLeft: "0.3rem",
            color: "red",
            fontWeight: 500,
          }}
        >
          {formErr}
        </p>
      )}
    </>
  );
}
