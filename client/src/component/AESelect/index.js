import React from "react";

export default function AESelect({ placeholder, options,value }) {
  return (
    <select className="form-select">
      <option selected={!value} disabled>
        {placeholder}
      </option>
      {options?.map((item, i) => {
        return (
          <option selected={item?.id == value} value={item?.id}>
            {item?.label}
          </option>
        );
      })}
    </select>
  );
}
