import express from "express";
import adminRouter from "./routes/adminRoute.js";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use("/admin/posts", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
