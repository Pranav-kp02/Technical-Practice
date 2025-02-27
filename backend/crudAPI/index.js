const express = require("express");
const dataBaseConnect = require("./ConnectMongoDB/connectDataBase");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
dataBaseConnect();

app.listen(4000, (req, res) => {
  console.log("server is runnig 0n 4000");
});

app.use((err, req, res, next) => {
  console.log(err.message);
});
