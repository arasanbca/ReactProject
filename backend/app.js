const exp = require("express");
const app = exp();
const dotenv =require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config({path:path.join(__dirname,'config','config.env')});
const CDBS = require("./config/ConnectDBS");

const product = require("./routes/Product");
const order = require("./routes/Order");

CDBS();

app.use(exp.json());
app.use(cors());
app.use("/api/pr",product);
app.use("/api/or",order);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in this port: ${process.env.PORT}`);
})