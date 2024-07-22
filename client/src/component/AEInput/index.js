import React from "react";

export default function AEInput(props) {
  const {
    endIcon,
    placeholder,
    type,
    onChange,
    value,
    maxLength,
    background,
    endText,
  } = props;
  return (
    <div className="input-group mb-3">
      <input
        type={type ? type : "text"}
        className="form-control"
        placeholder={placeholder}
        style={{ background: background ? background : "", fontWeight: 500 }}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      {endIcon && (
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
  );
}
