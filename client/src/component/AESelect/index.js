import React from "react";

export default function AESelect({ placeholder, options, value, background }) {
  return (
    <select
      className="form-select mb-3"
      style={{ background: background ? background : "", fontWeight: 500 }}
    >
      <option selected={!value} disabled>
        {placeholder}
      </option>
      {options?.map((item, i) => {
        return (
          <option selected={item == value} value={item} key={i}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
