const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const path = require("path");

//tell express to handle use JSON data
app.use(express.json());

app.use(cors());
//DB connection
require("./src/db/conn.js");

//image folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//transfer control to Router
app.use("/", require("./src/routers/route.js"));
app.use("/pg", require("./src/routers/route2.js"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
