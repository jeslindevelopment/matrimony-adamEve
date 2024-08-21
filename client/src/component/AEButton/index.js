import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./index.css";
import { color } from "../../assets/css/color/color";
export default function AEButton(props) {
  const { title, isLoader, fullWidth, onClick, style, height } = props;
  return (
    <button
      className="btn-one block"
      onClick={() => {
        if (!isLoader) {
          onClick();
        }
      }}
      style={{
        ...style,
        fontSize: 15,
        fontWeight: 600,
        width: fullWidth ? "100%" : "",
        height: height ? height : "",
        borderRadius: 20,
        background: color.hightLightColor,
        color: "white",
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
