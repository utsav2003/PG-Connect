import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const RentalCard = () => {
  const [dataList, setDataList] = useState([]);
  const [firstImageSrc, setFirstImageSrc] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/pg/pgReg/homepage", {
        params: {
          verify: true,
        },
      })
      .then((response) => {
        console.log(response);
        // Handle the API response here (e.g., show a success message)
        const newDataList = response.data.map((item) => ({
          id: item._id,
          boyOrGirl: item.TenantType,
          place: item.location,
          price: item.budget,
          area: item.area,
          furnished: item.furnishing,
          img: item.images.map(
            (filename) => `http://localhost:8000/${filename.path}`
          ),
        }));

        setDataList(newDataList);
        console.log(newDataList);
        // Set the source of the first image
        if (newDataList.length > 0) {
          // Select the first image path from the array
          setFirstImageSrc(newDataList[0].img[0]);
        }

        console.log(newDataList);
      })
      .catch((error) => {
        // Handle any errors here (e.g., show an error message)
        console.error("API Error:", error);
      });
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "#eee" }} className="py-5">
        <div className="d-flex justify-content-around flex-wrap">
          {dataList.map((data, index) => (
            <div key={index} className="card m-3" style={{ width: "22em" }}>
              <div
                className="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                {/* Set the src attribute of the img tag */}
                <img
                  src={index === 0 ? firstImageSrc : data.img[0]}
                  className="w-100"
                  height="250px"
                  alt={data.place}
                />

                <div className="mask">
                  <div className="d-flex justify-content-start align-items-end h-100">
                    <h5>
                      <span className="badge bg-danger ms-2">
                        {data.boyOrGirl === "Boys"
                          ? "Boys"
                          : data.boyOrGirl === "Girls"
                          ? "Girls"
                          : "Any"}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <h4 className="col mb-3">
                    <strong className="ms-2 text-danger">₹{data.price}</strong>
                  </h4>
                  <h4 className="col">{data.place}</h4>
                </div>
                <div
                  className="row"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="col">
                    <h6>Area</h6>
                    <p>{data.area} sq</p>
                  </div>
                  <div
                    className="col"
                    style={{
                      borderLeft: "1px solid black",
                      height: "3.5em",
                      padding: 0,
                      flex: "0.1",
                    }}
                  ></div>
                  <div className="col">
                    <h6>Furnishing</h6>
                    <p>{data.furnished}</p>
                  </div>
                </div>
              </div>
              <Link
                to={{
                  pathname: `/houseDetail/${data.id}`,
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button variant="primary" className="mb-3">
                  Show More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
