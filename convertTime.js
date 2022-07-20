function convertTZ() {
  const date = new Date();
  const tzString = "Asia/Makassar";
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

module.exports = convertTZ;
