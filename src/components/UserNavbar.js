import * as React from "react";
import GoogleTranslateComponent from "./GoogleTranslateComponent";

export default function UserNavbar() {
  return (
    <div className="flex w-full shadow-md flex-row justify-between items-center p-2">
      <div className="flex items-center gap-2">
        <img
          src="https://en.wikipedia.org/static/images/icons/wikipedia.png"
          alt="Logo"
          style={{
            width: "70px",
            height: "70px",
            cursor: "pointer",
          }}
        />
        <div className="flex flex-col justify-center h-full">
          <p className="m-0 font-semibold text-xl" style={{ fontFamily: "Times New Roman" }}>
            WIKIMEDIA
          </p>
          <p className="m-0 text-xs" style={{ fontFamily: "Times New Roman" }}>
            The User Encyclopedia
          </p>
        </div>
      </div>
      <div>
        <GoogleTranslateComponent />
      </div>
    </div>
  );
}
