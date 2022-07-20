if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const Absen = require("./models/absen");

const catchAsync = require("./catchAsync");
const convertTZ = require("./convertTime");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    process.env.DB_URL || "mongodb://localhost:27017/test"
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
// set path to the views directory
app.set("views", path.resolve(__dirname, "./views"));
// serve static file
app.use(express.static("public"));

app.get(
  "/",
  catchAsync(async (req, res, next) => {
    const filterCount = Object.keys(req.query).length;
    // check if there's a filter query
    if (filterCount) {
      const { tgl, bln, thn, sesi } = req.query;
      const filter = {};
      tgl ? (filter.tgl = tgl) : null;
      bln ? (filter.bln = bln) : null;
      thn ? (filter.thn = thn) : null;
      sesi ? (filter.sesi = sesi) : null;
      const allAbsen = await Absen.find(filter);
      const sortedAbsen = allAbsen.sort(function (a, b) {
        return a.peserta === b.peserta ? 0 : a.peserta < b.peserta ? -1 : 1;
      });
      return res.render("homePage", { allAbsen: sortedAbsen });
    }

    const allAbsen = await Absen.find({});
    const sortedAbsen = allAbsen.sort(function (a, b) {
      return a.peserta === b.peserta ? 0 : a.peserta < b.peserta ? -1 : 1;
    });
    return res.render("homePage", { allAbsen: sortedAbsen });
  })
);

app.get( catchAsync(async "/json", (req, res) => {
      const filterCount = Object.keys(req.query).length;
    // check if there's a filter query
    if (filterCount) {
      const { tgl, bln, thn, sesi } = req.query;
      const filter = {};
      tgl ? (filter.tgl = tgl) : null;
      bln ? (filter.bln = bln) : null;
      thn ? (filter.thn = thn) : null;
      sesi ? (filter.sesi = sesi) : null;
      const allAbsen = await Absen.find(filter);
      const sortedAbsen = allAbsen.sort(function (a, b) {
        return a.peserta === b.peserta ? 0 : a.peserta < b.peserta ? -1 : 1;
      });
      return res.status(200).json(sortedAbsen );
    }

    const allAbsen = await Absen.find({});
    const sortedAbsen = allAbsen.sort(function (a, b) {
      return a.peserta === b.peserta ? 0 : a.peserta < b.peserta ? -1 : 1;
    });
    res.status(200).json(sortedAbsen)
}));

// api
app.post(
  "/api/newAbsen",
  catchAsync(async (req, res) => {
    // check if the request has an api key
    const apiKey = req.query.apiKey;

    if (apiKey === process.env.API_KEY) {
      const { peserta, sesi } = req.body;
      const indoDate = convertTZ();

      const time = indoDate.toLocaleTimeString();
      const tgl = new Date().getDate();
      const bln = new Date().getMonth();
      const thn = new Date().getFullYear();

      const checkAbsen = await Absen.findOne({ tgl, bln, thn, peserta, sesi });

      if (checkAbsen) {
        return res.status(400).send("peserta sudah hadir");
      }
      const newAbsen = new Absen({
        peserta,
        sesi,
        time,
        tgl,
        bln,
        thn,
      });

      await newAbsen.save();

      return res.json({ success: "Berhasil" });
    }
    next(new Error("you're not authorized"));
  })
);
// handle error
// if there are no route with all method
app.use("*", (req, res, next) => {
  next(new Error("Page not found"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message } || "something went wrong");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("listening on port" + port);
});
