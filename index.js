const connectToMngo = require("./db");
const express = require("express")
const cors = require("cors");

connectToMngo();

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors());
app.use("/files", express.static("files"))

//Available routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/file", require('./routes/file'))

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})