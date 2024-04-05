const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const response = await axios.get(
    `https://scores.iplt20.com/ipl/mc/competition.js`
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("oncomptetion(", "");
    const finalStr = newStr.replace(");", "");
    const competitionData = JSON.parse(finalStr);
    res.status(200).json(JSON.parse(competitionData).competition);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});


module.exports = router;