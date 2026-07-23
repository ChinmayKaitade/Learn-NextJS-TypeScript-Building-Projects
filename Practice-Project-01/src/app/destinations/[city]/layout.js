import React from "react";

const CityLayout = ({ children, info }) => {
  return (
    <div className="flex">
      {children}
      {info}
    </div>
  );
};

export default CityLayout;
