import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Grid } from "@mui/material";
import moment from "moment";
import getTeamLogo from "./getTeamLogo";
import { getMatchTime } from "../utils/getMatchTime";
import { useNavigate } from "react-router-dom";

export default function LiveMatchCard(props) {
  const [matchData, setMatchData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setMatchData(props.data);
  }, [props.data]);

  return (
    <Box>
      {matchData && (
        <Card className="match-card" style={{ margin: "0 auto 20px" }}>
          <CardContent style={{ position: "relative", zIndex: 1 }}>
            <Box className="time">
              <svg height="10" width="10" class="blinking">
                <circle cx="5" cy="5" r="5" fill="red"></circle>
              </svg>{" "}
              <b style={{ color: "red" }}>Live</b>
            </Box>
            <Box>
              <Grid container spacing={2} alignItems="center" my={1}>
                <Grid item xs={3}>
                  <Box className="matchDetails">
                    <Box className="teamlogo">
                      <img
                        src={getTeamLogo(matchData.FirstBattingTeamName)}
                        alt={matchData.FirstBattingTeamName}
                      />
                    </Box>
                    <Box className="teamname">
                      {matchData.FirstBattingTeamCode}
                      <br />
                      <span className="score">
                        {matchData.FirstBattingSummary
                          ? matchData.FirstBattingSummary
                          : "Yet to Bat"}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ textAlign: "center" }}>
                    <Box className="date">
                      <h3>{getMatchTime(matchData.MATCH_COMMENCE_START_DATE)}</h3>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box className="matchDetails">
                    <Box className="teamlogo">
                      <img
                        src={getTeamLogo(matchData.SecondBattingTeamName)}
                        alt={matchData.SecondBattingTeamName}
                      />
                    </Box>
                    <Box className="teamname">
                      {matchData.SecondBattingTeamCode}
                      <br />
                      <span className="score">
                        {matchData.SecondBattingSummary
                          ? matchData.SecondBattingSummary
                          : "Yet to Bat"}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4} textAlign="end">
                  <Button
                    className="matchBtn"
                    onClick={() => navigate(`match/${matchData.MatchID}`)}
                  >
                    Match Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
