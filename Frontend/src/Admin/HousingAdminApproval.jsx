import React, { useState, useEffect } from "react";
import { Container, Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import "./ApprovalCard.css";
import { Link } from "react-router-dom";

const HousingAdminApproval = () => {
  const [dataList, setDataList] = useState([]);

  const onApprove = (id) => {
    axios
      .patch(`http://localhost:8000/pg/pgReg/action/${id}`, {
        action: "approve",
      })
      .then((response) => {
        console.log("Item Approved:", response.data);

        // Update the local state
        setDataList((prevDataList) =>
          prevDataList.map((item) =>
            item.id === id ? { ...item, approved: true } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error Approving Item:", error);
      });
  };

  const onReject = (id) => {
    axios
      .patch(`http://localhost:8000/pg/pgReg/action/${id}`, {
        action: "reject",
      })
      .then((response) => {
        console.log("Item Rejected and Deleted:", response.data);

        // Update the local state
        setDataList((prevDataList) =>
          prevDataList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error Rejecting Item:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/pg/pgReg/homepage", {
        params: {
          verify: false, // Add a query parameter to filter by 'verify' field
        },
      })
      .then((response) => {
        console.log(response);
        setDataList(
          response.data.map((item) => ({
            id: item._id,
            place: item.location,
            price: item.budget,
            img: item.images.map(
              (filename) => `http://localhost:8000/${filename.path}`
            ),
          }))
        );
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <Container className="p-3">
      <h1 className="mb-4 text-primary">Housing Admin Approval</h1>
      <div className="d-flex flex-wrap justify-content-around m-2">
        {dataList.map((item) => (
          <Card key={item.id} className="housing-admin-approval-card mb-4">
            <Image src={item.img[0]} alt={item.place} className="card-image" />
            <div className="card-body">
              <h5 className="card-title my-2">
                Rent: ${item.price} | Location: {item.place}
              </h5>
              <div className="d-flex justify-content-around">
                <Button
                  className="m-3"
                  variant="success"
                  onClick={() => onApprove(item.id)}
                >
                  Approve
                </Button>
                <Link
                  to={{
                    pathname: `/houseDetail/${item.id}`,
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button variant="primary" className="mt-3">
                    Show More
                  </Button>
                </Link>
                <Button
                  className="m-3"
                  variant="danger"
                  onClick={() => onReject(item.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default HousingAdminApproval;
