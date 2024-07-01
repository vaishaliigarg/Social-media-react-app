const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")


dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server once connected to MongoDB
        app.listen(5000, () => {
            console.log("Backend Server is running");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
//middlewares
    
    app.use(helmet());
    app.use(morgan("common"));
    app.use(express.json());
    app.use("/api/users",userRoute)
    app.use("/api/auth",authRoute)
    app.use("/api/posts",postRoute)

   