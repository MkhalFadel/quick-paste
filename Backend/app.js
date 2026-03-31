const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const linkRoutes = require("./Routes/createRoute")

app.use(cors({
   origin: "https://quick-paste-bice.vercel.app"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Frontend")));

app.use("/api/links/", linkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on port: ${PORT}`);
})