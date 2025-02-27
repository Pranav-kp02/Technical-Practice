const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose
    .connect("mongodb://localhost:27017/technical-practice")
    .then((data) => console.log(data.connection.host))
    .catch((err) => console.log(err));
};

module.exports = connectDataBase;
