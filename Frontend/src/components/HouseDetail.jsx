import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HouseDetail = () => {
  const [details, setDetails] = useState({});
  const params = useParams();

  const id = params.id;
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/pg/pgReg/findOne/${id}`)
      .then((response) => {
        console.log(response);
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  const images = details.images
    ? details.images.map((path) => ({
        src: `http://localhost:8000/${path.path}`,
        alt: "Housing Image",
      }))
    : [];

  return (
    <div className="housing-detail">
      <div className="text-center my-2">
        <h1 className="text-primary">Housing Details</h1>
      </div>
      <div className="d-flex flex-row flex-wrap">
        <div className="image-container col-md-6 p-3">
          <Carousel images={images} />
        </div>
        <div className="info-container col-md-6 p-3">
          <div className="card housing-detail">
            <div className="card-body">
              <h3 className="card-title text-danger mb-4">
                Rent: ${details.budget}/month
              </h3>
              <h4 className="card-subtitle my-3 text-muted">
                Location: {details.location}
              </h4>
              <div className="row row-cols-2 mb-3">
                <div className="col my-3">
                  <h5 className="fw-bold">Bedrooms:</h5> {details.bedrooms}
                  <h5 className="fw-bold">Budget:</h5> ${details.budget}
                </div>
                <div className="col my-3">
                  <h5 className="fw-bold">Area:</h5> {details.area}
                  <h5 className="fw-bold">Furnishing:</h5> {details.furnishing}
                </div>
              </div>
              <hr />
              <div className="row mb-3">
                <div className="col">
                  <h5 className="fw-bold">Meal Types:</h5>{" "}
                  {details.mealTypes && details.mealTypes.join(", ")}
                </div>
                <div className="col">
                  <h5 className="fw-bold">Meal Offering:</h5>{" "}
                  {details.mealOffering && details.mealOffering.join(", ")}
                </div>
              </div>
              <hr />
              <div className="row mb-3">
                <div className="col">
                  <h5 className="fw-bold">Rules:</h5>{" "}
                  {details.rules && details.rules.join(", ")}
                </div>
                <div className="col">
                  <h5 className="fw-bold">Security:</h5>{" "}
                  {details.security && details.security.join(", ")}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <h5 className="fw-bold">Services:</h5>{" "}
                  {details.services && details.services.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="d-block w-100"
              height="400px"
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
        onClick={() =>
          handleSlide((activeIndex - 1 + images.length) % images.length)
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
        onClick={() => handleSlide((activeIndex + 1) % images.length)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
export default HouseDetail;
