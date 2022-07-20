const { Schema, model } = require("mongoose");

const absenSchema = new Schema({
  peserta: { type: String, required: true },
  sesi: { type: Number, min: 1, required: true },
  time: { type: String, default: new Date().toLocaleTimeString("ID") },
  tgl: { type: String, default: new Date().getDate() },
  bln: { type: String, default: new Date().getMonth() },
  thn: { type: String, default: new Date().getFullYear() },
});

const Absen = model("Absen", absenSchema);

module.exports = Absen;
