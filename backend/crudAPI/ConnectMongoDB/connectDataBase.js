const mongoose = require("mongoose");

const dataBaseConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/technical-practice")
    .then((data) => {
      console.log(`Database connect ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = dataBaseConnect;
