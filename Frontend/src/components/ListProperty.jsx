import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

const ListProperty = () => {
  const [isLogin, setIsLogin] = useState(false);

  // Fetch isLogin data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/userReg/get");
        if (response.data && response.data.isLogin) {
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render Login component if isLogin is false, otherwise render the ListProperty component
  return isLogin ? <ListPropertyContent /> : <Login />;
};

const ListPropertyContent = () => {
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [tenantType, setTenantType] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [category, setCategory] = useState("");
  const [services, setServices] = useState([]);
  const [availableShops, setAvailableShops] = useState([]);
  const [mealTypes, setMealTypes] = useState([]); // New state for meal type selection
  const [mealOfferings, setMealOfferings] = useState([]); // New state for meal offering selection
  const [images, setImages] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const handleServiceCheckboxChange = (serviceName) => {
    setServices((prevServices) =>
      prevServices.includes(serviceName)
        ? prevServices.filter((service) => service !== serviceName)
        : [...prevServices, serviceName]
    );
  };

  const handleShopCheckboxChange = (shopName) => {
    setAvailableShops((prevShops) =>
      prevShops.includes(shopName)
        ? prevShops.filter((shop) => shop !== shopName)
        : [...prevShops, shopName]
    );
  };

  const handleMealTypeCheckboxChange = (mealType) => {
    setMealTypes((prevMealTypes) =>
      prevMealTypes.includes(mealType)
        ? prevMealTypes.filter((type) => type !== mealType)
        : [...prevMealTypes, mealType]
    );
  };

  const handleMealOfferingCheckboxChange = (mealOffering) => {
    setMealOfferings((prevMealOfferings) =>
      prevMealOfferings.includes(mealOffering)
        ? prevMealOfferings.filter((offering) => offering !== mealOffering)
        : [...prevMealOfferings, mealOffering]
    );
  };

  const handleImagesChange = (e) => {
    setImages(e.target.files);
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!budget) errors.budget = "Budget is required";
    if (!area) errors.area = "Area is required";
    if (!tenantType) errors.tenantType = "Tenant Type is required";
    if (!bedroom) errors.bedroom = "Bedroom is required";
    if (!furnishing) errors.furnishing = "Furnishing is required";
    if (!category) errors.category = "Category is required";
    if (!services) errors.services = "Services is required";
    if (!mealTypes) errors.mealType = "Meal Type is Required";
    if (!mealOfferings) errors.mealOffering = "Meal Offering is";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Done...");
    // const isFormValid = validateForm();
    // Your API call here with the form data
    // if (isFormValid) {
    const fd = new FormData();
    for (let i = 0; i < images.length; i++) {
      fd.append("images", images[i]);
    }
    fd.append("email", email);
    fd.append("area", area);
    fd.append("budget", budget);
    fd.append("TenantType", tenantType);
    fd.append("bedrooms", bedroom);
    fd.append("furnishing", furnishing);
    fd.append("location", location);
    fd.append("category", category);
    fd.append("services", services);
    fd.append("mealTypes", mealTypes);
    fd.append("mealOffering", mealOfferings);

    // const formData = {
    //   email: email,
    //   budget: budget,
    //   area: area,
    //   TenantType: tenantType,
    //   bedrooms: bedroom,
    //   furnishing: furnishing,
    //   location: location,
    //   category: category,
    //   services: services,
    //   mealTypes: mealTypes,
    //   mealOffering: mealOfferings,
    //   images: fd,
    // };
    console.log(fd);
    // Make the API call using Axios
    axios({
      method: "post",
      url: "http://localhost:8000/pg/pgReg",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
    // }
  };

  return (
    <div style={{ backgroundColor: "#eee" }} className="p-3">
      <div className="container">
        <h2 className="p-4" style={{ color: "#000080" }}>
          List Your Property Here
        </h2>
        <div
          className="d-flex text-start justify-content-center my-3"
          style={{ fontSize: "1.2em" }}
        >
          <div style={{ width: "40%" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input
                  type="text"
                  className="form-control"
                  id="budget"
                  required
                  placeholder="Enter budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="area">Area:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="area"
                  placeholder="Enter area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tenantType">Tenant Type:</label>
                <select
                  className="form-control"
                  id="tenantType"
                  required
                  value={tenantType}
                  onChange={(e) => setTenantType(e.target.value)}
                  style={{ marginBottom: "1em" }}
                >
                  <option value="">Select Tenant Type</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Any">Any</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bedroom">Bedroom:</label>
                <select
                  className="form-control"
                  id="bedroom"
                  value={bedroom}
                  required
                  onChange={(e) => setBedroom(e.target.value)}
                  style={{ marginBottom: "1em" }}
                >
                  <option value="">Select Bedroom</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="More">More</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="furnishing">Furnishing:</label>
                <select
                  className="form-control"
                  id="furnishing"
                  value={furnishing}
                  required
                  onChange={(e) => setFurnishing(e.target.value)}
                  style={{ marginBottom: "1em" }}
                >
                  <option value="">Select Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi Furnished">Semi Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  className="form-control"
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ marginBottom: "1em" }}
                >
                  <option value="">Select Category</option>
                  <option value="Flat">Flat</option>
                  <option value="Apartment">Apartment</option>
                  <option value="PG">PG</option>
                </select>
              </div>

              <div className="form-group">
                <label>Services:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Water"
                      checked={services.includes("Water")}
                      onChange={() => handleServiceCheckboxChange("Water")}
                    />{" "}
                    Water
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Wifi"
                      checked={services.includes("Wifi")}
                      onChange={() => handleServiceCheckboxChange("Wifi")}
                    />{" "}
                    Wifi
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Daily Cleaning"
                      checked={services.includes("Daily Cleaning")}
                      onChange={() =>
                        handleServiceCheckboxChange("Daily Cleaning")
                      }
                    />{" "}
                    Daily Cleaning
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Available Shops:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Grocery"
                      checked={availableShops.includes("Grocery")}
                      onChange={() => handleShopCheckboxChange("Grocery")}
                    />{" "}
                    Grocery
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Food"
                      checked={availableShops.includes("Food")}
                      onChange={() => handleShopCheckboxChange("Food")}
                    />{" "}
                    Food
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Medical"
                      checked={availableShops.includes("Medical")}
                      onChange={() => handleShopCheckboxChange("Medical")}
                    />{" "}
                    Medical
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Meal Type:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Breakfast"
                      checked={mealTypes.includes("Breakfast")}
                      onChange={() => handleMealTypeCheckboxChange("Breakfast")}
                    />{" "}
                    Breakfast
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Lunch"
                      checked={mealTypes.includes("Lunch")}
                      onChange={() => handleMealTypeCheckboxChange("Lunch")}
                    />{" "}
                    Lunch
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Dinner"
                      checked={mealTypes.includes("Dinner")}
                      onChange={() => handleMealTypeCheckboxChange("Dinner")}
                    />{" "}
                    Dinner
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Meal Offerings:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Punjabi"
                      checked={mealOfferings.includes("Punjabi")}
                      onChange={() =>
                        handleMealOfferingCheckboxChange("Punjabi")
                      }
                    />{" "}
                    Punjabi
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="SouthIndian"
                      checked={mealOfferings.includes("SouthIndian")}
                      onChange={() =>
                        handleMealOfferingCheckboxChange("SouthIndian")
                      }
                    />{" "}
                    South Indian
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Chinese"
                      checked={mealOfferings.includes("Chinese")}
                      onChange={() =>
                        handleMealOfferingCheckboxChange("Chinese")
                      }
                    />{" "}
                    Chinese
                  </label>
                </div>
              </div>

              {/* Take input as a image */}
              <div className="form-group">
                <label htmlFor="image">Images:</label>
                <input
                  type="file"
                  enctype="multipart/form-data"
                  required
                  multiple
                  className="form-control"
                  id="image"
                  name="images"
                  accept="image/*"
                  onChange={handleImagesChange}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
