const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error");
const path = require("path");
const fileupload = require("express-fileupload");

const app = express();
// LOad env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Routes files
const auth = require("./routes/auth");
const questions = require("./routes/questions");
const user = require("./routes/user");
const comment = require("./routes/comment");
const note = require("./routes/note");

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Moute routers
app.use("/auth", auth);
app.use("/questions", questions);
app.use("/user", user);
app.use("/comments", comment);
app.use("/notes", note);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
