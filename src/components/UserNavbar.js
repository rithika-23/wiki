import * as React from "react";
import GoogleTranslateComponent from "./GoogleTranslateComponent";

export default function UserNavbar() {
  return (
    <div className="flex w-full justify-center shadow-md pb-3">
      <div className="h-[12vh] flex items-center justify-between w-[95vw]">
        <div className="flex gap-4">
          <div>
            <img
              src="https://en.wikipedia.org/static/images/icons/wikipedia.png"
              alt="Logo"
              style={{
                width: "70px",
                height: "70px",
                cursor: "pointer",
                marginTop:"10px"
              }}
            />
          </div>
          <div className="hidden md:flex flex-col">
            <h2>WIKIMEDIA</h2>
            <p style={{ fontFamily: "Times New Roman" }}>
              The User Encyclopedia
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <GoogleTranslateComponent />
        </div>
      </div>
    </div>
  );
}
