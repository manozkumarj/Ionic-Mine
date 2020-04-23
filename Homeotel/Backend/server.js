const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const cors = require("cors");
const port = 8123;

// parsing the data
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// cross orgin related code
app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));

// importing doctor related routes from routes folder
const doctorRoutes = require("./routes/doctor");
// importing user related routes from routes folder
const userRoutes = require("./routes/user");

app.use("/doctor", doctorRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server startd on port --> ${port}`);
});
