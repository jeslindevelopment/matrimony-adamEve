import React from "react";

export default function AESelect({
  placeholder,
  options,
  value,
  background,
  onChange,
  formErr,
}) {
  return (
    <>
      <select
        className="form-select mb-3"
        onChange={onChange}
        style={{
          background: background ? background : "",
          fontWeight: 500,
          color: value ? "black" : "#808080",
        }}
      >
        <option selected={!value} disabled>
          {placeholder}
        </option>
        {options?.map((item, i) => {
          return (
            <option
              style={{ color: "black" }}
              selected={item == value}
              value={item}
              key={i}
            >
              {item}
            </option>
          );
        })}
      </select>
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
