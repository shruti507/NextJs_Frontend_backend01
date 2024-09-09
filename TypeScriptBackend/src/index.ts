// import express, { Application } from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cookieParser from "cookie-Parser";
// import cors from "cors";
// import mongoose from "mongoose";
// import UserRouter from "./routes/user.route";
// import session from "express-session";
// import PropertyRouter from "./routes/property.route";
// // import auth from "./middleware/auth"

// dotenv.config();

// const app: Application = express(); // Define the app variable as an Express Application

// // Middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your_secret_key", // Use environment variable for security
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://localhost:27017/property")
//   .then(() => {
//     console.log("MongoDB connected...");

//     // Routes
//     app.use("/user", UserRouter);
//     app.use("/properties", PropertyRouter);

//     // Start the server after successful database connection
//     const port = process.env.PORT || 3000; // Use environment variable for port
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// export default app;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "./routes/user.route";
import session from "express-session";
import PropertyRouter from "./routes/property.route";
// import auth from "./middleware/auth"

dotenv.config();
const app: Application = express(); // Define the app variable as an Express Application

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Use environment variable for security
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/property")
  .then(() => {
    console.log("MongoDB connected...");

    // Routes
    app.use("/user", UserRouter);
    app.use("/properties", PropertyRouter);

    // Start the server after successful database connection
    const port = process.env.PORT || 3000; // Use environment variable for port
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;

