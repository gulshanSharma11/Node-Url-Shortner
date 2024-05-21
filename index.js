const express = require("express");
const mongoose=require("mongoose");
const path=require("path");
const shortner=require('./routes/shortner');
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 7001;


mongoose.connect("mongodb://127.0.0.1:27017/urlShortnerr").then(()=> console.log("database connected"))
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/url", urlRoute);
app.get('/',shortner);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne(
    {
      shortId
    }
    
  );
  
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle case where short URL doesn't exist
    res.status(404).send("Short URL not found");
  }
  
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
