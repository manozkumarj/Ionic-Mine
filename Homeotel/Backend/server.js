const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const port = 8088;

// parsing the data
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// cross orgin related code
app.use(cors());
app.options("*", cors());

// importing doctor related routes from routes folder
const doctorRoutes = require("./routes/doctor");
// importing user related routes from routes folder
const userRoutes = require("./routes/user");

app.use("/doctor", doctorRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server startd on port --> ${port}`);
});
