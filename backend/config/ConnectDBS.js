const mongoose = require("mongoose");

const connectdbs = () =>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log("Mongodb connected to the host: "+con.connection.host); 
    })
}

module.exports = connectdbs;