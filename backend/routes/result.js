const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:compitetionId", async (req, res) => {
const id = req.params.compitetionId;
  const response = await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${id}-matchschedule.js`
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("MatchSchedule(", "");
    const finalStr = newStr.replace(");", "");
    const matchData = JSON.parse(finalStr);
    res.status(200).json(JSON.parse(matchData).Matchsummary);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});


module.exports = router;