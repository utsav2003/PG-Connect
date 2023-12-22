const express = require("express");
const route = express.Router();
const path = require("path");

//image logic
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//userReg Model import
const pgReg = require("../models/regPG.js");

//for send a mail
const transporter = require("../mail/mailer.js");

//find specific pg from id
route.get("/pgReg/findOne/:id", async (req, res) => {
  try {
    console.log(req.params.filter_type);
    const filter_data = await pgReg.findById({
      _id: req.params.id,
    });
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

//for Insert data request
route.post("/pgReg", upload.array("images", 4), async (req, res) => {
  try {
    console.log("hey....", req.body);
    console.log("--", req.file);
    // const files = req.image.map((file) => ({
    //   filename: file.filename,
    //   path: file.path,
    // }));
    const files = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));
    console.log(req.body);
    const user = new pgReg({
      ...req.body,
      images: files,
    });
    console.log(req.body.email);
    const insert = await user.save();
    res.send(insert);

    //to send a mail
    const mailOptions = {
      from: "your_email@gmail.com",
      to: req.body.email, // The recipient's email address
      subject: "Confirmation: Your Data Successfully Added to PG Connect",
      text: "We are pleased to inform you that your data has been successfully added to PG Connect. However, before it becomes visible to users, we need to complete a verification process to ensure the accuracy and security of the information.",
    };

    //sending a mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Email sending failed" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Data registered successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//filter module query

//tenant boy ,girl ,boy/girl
route.get("/pgReg/tenant/:filter_type", async (req, res) => {
  try {
    console.log(req.params.filter_type);
    const filter_data = await pgReg.find({
      TenantType: req.params.filter_type,
      verify: true,
    });
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

//bedroom 3bhk 2bhk etc..
route.get("/pgReg/bedroom/:bedroom", async (req, res) => {
  try {
    console.log(req.params.filter_type);
    const filter_data = await pgReg.find({
      bedrooms: req.params.bedroom,
      verify: true,
    });
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

//budget <=6000  <=7000
route.get("/pgReg/budget/:budget", async (req, res) => {
  let flag = 0;
  const range = req.params.budget.split("-");
  if (range.length == 1) {
    flag = 1;
    console.log("Single data");
  }
  //console.log(range);
  try {
    if (flag) {
      const filter_data = await pgReg.find({
        budget: { $gte: 0, $lte: parseInt(range[0]) },
        verify: true,
      });
      res.status(200).send(filter_data);
    } else {
      console.log("false part");
      console.log(parseInt(range[1]));
      const filter_data = await pgReg.find({
        budget: { $gte: parseInt(range[0]), $lte: parseInt(range[1]) },
        verify: true,
      });
      res.status(200).send(filter_data);
    }
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

//furnishing semi-furnishing full-furnishing etc
route.get("/pgReg/furnishing/:furnishing", async (req, res) => {
  try {
    console.log(req.params.filter_type);
    const filter_data = await pgReg.find({
      furnishing: req.params.furnishing,
      verify: true,
    });
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

//filter for all in one

route.get("/pgReg/filter", async (req, res) => {
  console.log("inside filter");

  try {
    if (req.query != {}) {
      console.log(req.query); // Use req.query to access parameters from the query string
      const filterCriteria = {
        TenantType: req.query.data.tenant || null,
        budget: req.query.data.budget || null,
        bedrooms: req.query.data.bedroom || null,
        furnishing: req.query.data.furnishing || null,
      };

      // Build the filter query based on user's input
      const filterQuery = buildFilterQuery(filterCriteria);
      console.log("filterquery::", filterQuery);
      const data = await pgReg.find(filterQuery);
      console.log(data);

      res.status(200).send(data);
    }
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

function buildFilterQuery(criteria) {
  const filterQuery = {};
  let flag = 0;
  if (criteria.TenantType) {
    filterQuery.TenantType = criteria.TenantType;
  }

  if (criteria.budget) {
    const range = criteria.budget.split("-");
    console.log(range);
    if (range.length == 1) {
      flag = 1;
    }
    if (flag) {
      filterQuery.budget = { $gte: 0, $lte: parseInt(range[0]) };
    } else {
      filterQuery.budget = {
        $gte: parseInt(range[0]),
        $lte: parseInt(range[0]),
      };
    }

    //filterQuery.budget = { $lte: criteria.budget };
  }

  if (criteria.bedrooms) {
    filterQuery.bedrooms = criteria.bedrooms;
  }

  if (criteria.furnishing) {
    filterQuery.furnishing = criteria.furnishing;
  }

  return filterQuery;
}

//data for the home page display
route.get("/pgReg/homepage", async (req, res) => {
  try {
    const { verify } = req.query;
    // Check if 'verify' parameter is provided
    const filter = verify === "false" ? { verify: false } : { verify: true };

    const filter_data = await pgReg.find(filter);
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

// Update the 'verify' field or delete the item based on the action
route.patch("/pgReg/action/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // Assuming you send the action as 'approve' or 'reject' in the request body

    if (action === "approve") {
      const updatedItem = await pgReg.findByIdAndUpdate(
        id,
        { verify: true },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(200).send(updatedItem);
    } else if (action === "reject") {
      const deletedItem = await pgReg.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(200).send(deletedItem);
    } else {
      return res.status(400).send({ message: "Invalid action" });
    }
  } catch (err) {
    console.error("Error in Action:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//onApprove and onReject action Route
route.patch("/pgReg/action/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (action === "approve") {
      const updatedItem = await pgReg.findByIdAndUpdate(id, { verify: true });

      if (!updatedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(200).send(updatedItem);
    } else if (action === "reject") {
      const deletedItem = await pgReg.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(200).send(deletedItem);
    } else {
      return res.status(400).send({ message: "Invalid action" });
    }
  } catch (err) {
    console.error("Error in Action:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Pending verification request (Admin panel)
route.get("/pgReg/adminpanel", async (req, res) => {
  try {
    console.log(req.params.filter_type);
    const filter_data = await pgReg.find({
      verify: false,
    });
    res.status(200).send(filter_data);
  } catch (err) {
    console.log("error in Filter::", err);
    res.status(400).send(err);
  }
});

// const userReg = require("../models/userReg");

//for login page and set up the flag

// var flag = 0
// route.get("/pgReg/login", async (req, res) => {
//   try {
//     console.log(req.body);
//     const filter_data = await userReg.find({
//       email: req.body.email
//     });

//     res.status(200).send(filter_data);
//   } catch (err) {
//     console.log("error in Filter::", err);
//     res.status(400).send(err);
//   }
// });

// to update verify flag to true on admin request
route.patch("/update/verify/:email", async (req, res) => {
  const query = { email: req.params.email };
  const update = { $set: { verify: true } };
  const option = { new: true };

  pgReg.findOneAndUpdate(query, update, option).then((document_) => {
    if (!document_) {
      res.status(400).send(err);
    } else {
      res.status(200).send(document_);

      //to send a mail
      const mailOptions = {
        from: "your_email@gmail.com",
        to: req.params.email, // The recipient's email address
        subject: "Your Data Has Been Verified - PGConnect",
        text: "We are pleased to inform you that your data has been successfully verified in our system, PGConnect.Your information is now visible and accessible.Thank you for using our services, and we appreciate your trust in PGConnect.If you have any questions or require further assistance, please do not hesitate to reach out to our support team.Once again, thank you for choosing PGConnect.We look forward to continuing to serve you.",
      };

      //sending a mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ message: "Email sending failed" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Data registered successfully" });
        }
      });
    }
  });
});

module.exports = route;
