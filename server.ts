require("dotenv").config();
const express = require("express");
let mongoose: any = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// initiate express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// fileupload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
// -------upload router
app.use("/v1", require("./routes/blogRouter"));
app.use("/v1", require("./routes/uploadRouter"));

app.get("/", (req: any, res: any) => {
  res.json({ msg: "Welcome to Medtech Backend" });
});

// connect to mongo db
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res: any) => {
    console.log("Database connected");
  })
  .catch((error: any) => {
    console.log(error);
  });

// mongoose.set('strictQuery', true);

// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

// comments
