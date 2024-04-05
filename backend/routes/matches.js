const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const response = await axios.get(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/148-matchschedule.js"
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

router.get("/matchsummary/:id", async (req, res) => {
  const matchId = req.params.id;
  const response = await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/148-matchschedule.js`
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("MatchSchedule(", "");
    const finalStr = newStr.replace(");", "");
    const matchData = JSON.parse(finalStr);
    const finalMatchData = JSON.parse(matchData).Matchsummary;
    const currMatchData = finalMatchData.filter(item => item.MatchID === parseInt(matchId));
    res.status(200).json(currMatchData);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});

router.get("/innings1/:id", async (req, res) => {
  const matchId = req.params.id;
  await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings1.js`
  ).then(response => {
    if (response && response.status === 200) {
      const str = JSON.stringify(response.data);
      const newStr = str.replace("onScoring(", "");
      const finalStr = newStr.replace(");", "");
      const matchData = JSON.parse(finalStr);
      const finalMatchData = JSON.parse(matchData).Innings1;
      res.status(200).json(finalMatchData);
    }
  }).catch(() => {
    res.status(404).json({ msg: "something went wrong!" });
  });
});

router.get("/innings2/:id", async (req, res) => {
  const matchId = req.params.id;
  const response = await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings2.js`
  ).then(response => {
    if (response && response.status === 200) {
      const str = JSON.stringify(response.data);
      const newStr = str.replace("onScoring(", "");
      const finalStr = newStr.replace(");", "");
      const matchData = JSON.parse(finalStr);
      const finalMatchData = JSON.parse(matchData).Innings2;
      res.status(200).json(finalMatchData);
    }
  }).catch(() => {
    res.status(404).json({ msg: "something went wrong!" });
  });
});

router.get("/squad/:id", async (req, res) => {
  const matchId = req.params.id;
  const response = await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/squads/${matchId}-squad.js`
  ).then(response => {
    if (response && response.status === 200) {
      const str = JSON.stringify(response.data);
      const newStr = str.replace("onsquadFixture(", "");
      const finalStr = newStr.replace(");", "");
      const matchData = JSON.parse(finalStr);
      res.status(200).json(JSON.parse(matchData));
    }
  }).catch(() => {
    res.status(404).json({ msg: "something went wrong!" });
  });
});

// https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/1370-squad.js
router.get("/teams/:id", async (req, res) => {
  const matchId = req.params.id;
  const response = await axios.get(
    `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-squad.js`
  ).then(response => {
    if (response && response.status === 200) {
      const str = JSON.stringify(response.data);
      const newStr = str.replace("onsquad(", "");
      const finalStr = newStr.replace(");", "");
      const matchData = JSON.parse(finalStr);
      res.status(200).json(JSON.parse(matchData));
    }
  }).catch(() => {
    res.status(404).json({ msg: "something went wrong!" });
  });
});

router.get("/upcoming", async (req, res) => {
  const response = await axios.get(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/107-matchschedule.js"
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("MatchSchedule(", "");
    const finalStr = newStr.replace(");", "");
    const matchData = JSON.parse(finalStr);
    const updatedMatches = JSON.parse(matchData).Matchsummary;
    let upcomingMatches = [];
    updatedMatches.length > 0 &&
      updatedMatches.map((match) => {
        if (match.MatchStatus === "UpComing") {
          upcomingMatches.push(match);
        }
      });
    res.status(200).json(upcomingMatches);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});

router.get("/live", async (req, res) => {
  const response = await axios.get(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/148-matchschedule.js"
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("MatchSchedule(", "");
    const finalStr = newStr.replace(");", "");
    const matchData = JSON.parse(finalStr);
    const updatedMatches = JSON.parse(matchData).Matchsummary;
    let upcomingMatches = [];
    updatedMatches.length > 0 &&
      updatedMatches.map((match) => {
        if (match.MatchStatus === "Live") {
          upcomingMatches.push(match);
        }
      });
    res.status(200).json(upcomingMatches);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});

router.get("/past", async (req, res) => {
  const response = await axios.get(
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/148-matchschedule.js"
  );
  if (response && response.status === 200) {
    const str = JSON.stringify(response.data);
    const newStr = str.replace("MatchSchedule(", "");
    const finalStr = newStr.replace(");", "");
    const matchData = JSON.parse(finalStr);
    const updatedMatches = JSON.parse(matchData).Matchsummary;
    let upcomingMatches = [];
    updatedMatches.length > 0 &&
      updatedMatches.map((match) => {
        if (match.MatchStatus === "Post") {
          upcomingMatches.push(match);
        }
      });
    res.status(200).json(upcomingMatches);
  } else {
    res.status(404).json({ msg: "something went wrong!" });
  }
});

module.exports = router;
