const sendErrorresponse = (error, res) => {
  // console.error("Xatolik:", error?.message || error);
  if (!res.headersSent) {
    res.status(400).send({
      message: "Xatolik",
      error: error?.message || "Noma'lum xatolik",
    });
  }
};

module.exports = {
  sendErrorresponse
}
