const express = require('express')
const routes = require('./routes')
const connectDB = require('./config/mongodb')
const app = express()
const cors = require('cors');
const { responseJson } = require("./utils/http");
const { errorHandling } = require("./middleware/global_error"); 

require('dotenv').config();

//implement cors
app.use(
  cors({
    url: ["*"]
  })
);

const port = process.env.PORT || 3000
connectDB();

app.use(express.json());

app.use("/api/v1",routes);
app.use(errorHandling);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});