import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React, { useState } from "react";
import "./BackToTop.css";
export default function BackToTop() {
  const [ButtonState, setButtonState] = useState("null");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setButtonState("block");
    } else {
      setButtonState("none");
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      <button
        onClick={topFunction}
        id="myBtn"
        className={ButtonState + " shadow"}
        title="Go to top"
      >
        <ArrowUpwardOutlinedIcon className="arrow-icon" />
      </button>
    </div>
  );
}
