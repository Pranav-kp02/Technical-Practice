const express = require("express");
const connectDataBase = require("./config/connectDB");
const userRoute = require("./routes/userRoutes");
const cookie = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

connectDataBase();

app.use(userRoute);

app.listen(4000, (req, res) => {
  console.log("sever is running on 4000");
});

app.use((err, req, res, next) => {
  console.log(err);
});
