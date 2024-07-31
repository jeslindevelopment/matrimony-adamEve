import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./index.css";
export default function AEButton(props) {
  const { title, isLoader, fullWidth, onClick, style, height } = props;
  return (
    <button
      className="theme-btn btn-one block"
      onClick={onClick}
      style={{
        ...style,
        fontSize: 15,
        fontWeight: 600,
        width: fullWidth ? "100%" : "",
        height: height ? height : "",
        borderRadius: 20,
        padding: "10px 25px 10px 25px",
      }}
      disabled={isLoader}
    >
      {isLoader ? (
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        title
      )}
    </button>
  );
}
