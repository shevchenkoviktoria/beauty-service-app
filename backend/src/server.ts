import bodyParser = require("body-parser");
import authRoutes from "./routes/authRoutes";
import { Sequelize } from "sequelize";
const dotenv = require("dotenv");
import express from "express";



dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);


// Database Sync and Server Start
sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));

