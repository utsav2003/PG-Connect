import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = () => {
  const [selectedBtn, setSelectedBtn] = useState({});

  useEffect(() => {
    // Only send data to API when selectedBtn changes
    const sendDataToApi = async () => {
      console.log(selectedBtn); // Verify that selectedBtn is updated
      try {
        const response = await axios.get(
          "http://localhost:8000/pg/pgReg/filter",
          {
            params: { data: selectedBtn },
          }
        );

        console.log("Request sent:", response.data);
      } catch (error) {
        console.log("error");
      }
    };

    // Call the API when the component mounts and whenever selectedBtn changes
    sendDataToApi();
  }, [selectedBtn]);

  const handleButtonClick = (btn, filterType) => {
    setSelectedBtn((prevSelectedBtn) => ({
      ...prevSelectedBtn,
      [filterType]: btn,
    }));
  };

  return (
    <div>
      {/* search bar */}
      <div className="input-group m-4">
        <div className="form-outline">
          <input
            type="search"
            placeholder="Search"
            id="form1"
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-primary">
          <i className="bi bi-search"></i>
        </button>
      </div>
      {/* filters */}
      <div className="filter my-3">
        {/* tenant filter */}
        <div className="tenant-type">
          <h4 className="text-start mx-4">Tenant-Type</h4>
          <div className="text-start mx-4">
            <button
              className={`btn ${
                selectedBtn["tenant"] === "Boys" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("Boys", "tenant")}
            >
              Boys
            </button>
            <button
              className={`btn ${
                selectedBtn["tenant"] === "Girls" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("Girls", "tenant")}
            >
              Girls
            </button>
            <button
              className={`btn ${
                selectedBtn["tenant"] === "Any" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("Any", "tenant")}
            >
              Any
            </button>
          </div>
        </div>
        <hr style={{ width: "90%", marginLeft: "5%" }} />

        {/* Bedroom filter */}
        <div className="Bedrooms">
          <h4 className="text-start mx-4">Bedrooms</h4>
          <div className="text-start mx-4">
            <button
              className={`btn ${
                selectedBtn["bedroom"] === "1BHK" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("1BHK", "bedroom")}
            >
              1 BHK
            </button>
            <button
              className={`btn ${
                selectedBtn["bedroom"] === "2BHK" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("2BHK", "bedroom")}
            >
              2 BHK
            </button>
            <button
              className={`btn ${
                selectedBtn["bedroom"] === "3BHK" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("3BHK", "bedroom")}
            >
              3 BHK
            </button>
            <button
              className={`btn ${
                selectedBtn["bedroom"] === "4BHK" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("4BHK", "bedroom")}
            >
              4+ BHK
            </button>
          </div>
        </div>

        {/* Budget Filter */}
        <hr style={{ width: "90%", marginLeft: "5%" }} />
        <div className="Bedrooms">
          <h4 className="text-start mx-4">Budget</h4>
          <div className="text-start mx-4">
            <button
              className={`btn ${
                selectedBtn["budget"] === "10k" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("10k", "budget")}
            >
              Below 10k
            </button>
            <button
              className={`btn ${
                selectedBtn["budget"] === "20k" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("20k", "budget")}
            >
              10k - 20k
            </button>
            <button
              className={`btn ${
                selectedBtn["budget"] === "30k" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("30k", "budget")}
            >
              20k - 30k
            </button>
            <button
              className={`btn ${
                selectedBtn["budget"] === "30k+" ? "btn-primary" : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("30k+", "budget")}
            >
              Above 30k
            </button>
          </div>
        </div>
        <hr style={{ width: "90%", marginLeft: "5%" }} />

        {/* Furnishing Filter */}
        <div className="tenant-type">
          <h4 className="text-start mx-4">Furnishing</h4>
          <div className="text-start mx-4">
            <button
              className={`btn ${
                selectedBtn["furnishing"] === "full"
                  ? "btn-primary"
                  : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("full", "furnishing")}
            >
              Fully Furnished
            </button>
            <button
              className={`btn ${
                selectedBtn["furnishing"] === "semi"
                  ? "btn-primary"
                  : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("semi", "furnishing")}
            >
              Semi Furnished
            </button>
            <button
              className={`btn ${
                selectedBtn["furnishing"] === "Unfurnished"
                  ? "btn-primary"
                  : "btn-light"
              } m-2`}
              onClick={() => handleButtonClick("Unfurnished", "furnishing")}
            >
              Unfurnished
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
