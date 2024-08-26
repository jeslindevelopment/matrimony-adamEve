import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function AESmallButton(props) {
  const { title, isLoader, fullWidth, onClick, style,height } = props;
  return (
    <button
      className="theme-btn btn-one block"
      onClick={onClick}
      style={{
        ...style,
        fontSize: 12,
        fontWeight: 400,
        width: fullWidth ? "100%" : "",
        height: height ? height : "10px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        // padding: "10px 25px 10px 25px",
      }}
      disabled={isLoader}
    >
      {isLoader ? <FaSpinner className="spinner" /> : title}
    </button>
  );
}

// Add some CSS to style the spinner icon
const styles = `
  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
