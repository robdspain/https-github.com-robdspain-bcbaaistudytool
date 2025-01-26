import React from "react";
    import "./LoadingSpinner.css";

    export const LoadingSpinner = () => {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    };
