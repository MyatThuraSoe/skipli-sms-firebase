require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookies = require("cookie-parser");

const admin = require("firebase-admin");

const app = express();

const { accessCode, github } = require("./routes/routes");

app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookies());

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
// app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/views", express.static(path.resolve(__dirname, "views")));
// app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use("/accesscode", accessCode);
app.use("/github", github);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening to port number ${PORT}`);
});
