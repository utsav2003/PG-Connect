import React from "react";
import Filter from "./Filter";
import RentalCard from "./RentalCard";

const Houses = () => {
  return (
    <div>
      <div className="d-flex">
        <div style={{ flex: "30%" }}>
          <Filter />
        </div>
        <div style={{ flex: "70%" }}>
          <RentalCard />
        </div>
      </div>
    </div>
  );
};

export default Houses;
