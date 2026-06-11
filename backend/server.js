require("dotenv").config();
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const taskRoutes =
    require("./routes/task.routes");

const adminRoutes =
    require("./routes/admin.routes");
const logActivity =
    require("./utils/activityLog");

const errorHandler =
    require(
        "./middlewares/errorHandler"
    );


connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 