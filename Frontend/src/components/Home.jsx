import React from "react";
import Slider from "./Slider";
import RentalCard from "./RentalCard";

const Home = () => {
  return (
    <div>
      <Slider />
      <h1 className="m-5">
        Where comfort meets convenience. Find a rental that suits your taste and
        lifestyle, ensuring a homey experience every day.
      </h1>
      <RentalCard />
    </div>
  );
};

export default Home;
