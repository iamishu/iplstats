import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Grid } from "@mui/material";
import moment from "moment";
import getTeamLogo from "./getTeamLogo";
import { useNavigate } from "react-router-dom";
import { getTeamCode, getTeamOvers, getTeamScore } from "../utils/getTeamData";

export default function ResultCard(props) {
  const [matchData, setMatchData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setMatchData(props.data);
  }, [props.data]);

  return (
    <Box>
      {matchData && (
        <Card className="match-card" style={{ margin: "0 auto 20px" }}>
          <CardContent style={{ position: "relative", zIndex: 1, paddingBottom: "16px" }}>
            <Box>
              <Grid container spacing={2} alignItems="center" my={1}>
                <Grid item xs={3}>
                  <Box className="matchDetails" display="flex" sx={{ justifyContent: "space-around", alignItems: "center" }}>
                    <Box className="teamlogo" textAlign="center">
                      <img
                        src={getTeamLogo(matchData.HomeTeamName)}
                        alt={matchData.HomeTeamName}
                      />
                      <br />
                      <b>{getTeamCode(matchData, matchData.HomeTeamName)}</b>
                    </Box>
                    <Box className="teamname">
                      <span style={{ fontSize: "30px", fontFamily: 'Bebas Neue', fontWeight: 400, display: "block", lineHeight: "30px" }}>
                        {getTeamScore(matchData, matchData.HomeTeamName)}
                      </span>
                      <span style={{ fontSize: "12px" }}>
                        {getTeamOvers(matchData, matchData.HomeTeamName)}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3} textAlign="center">
                  <Box className="match">{moment(matchData.MATCH_COMMENCE_START_DATE).fromNow()}</Box>
                </Grid>
                <Grid item xs={3}>
                  <Box className="matchDetails" display="flex" sx={{ justifyContent: "space-around", alignItems: "center" }}>
                    <Box className="teamlogo" textAlign="center">
                      <img
                        src={getTeamLogo(matchData.AwayTeamName)}
                        alt={matchData.AwayTeamName}
                      />
                      <br />
                      <b>{getTeamCode(matchData, matchData.AwayTeamName)}</b>
                    </Box>
                    <Box className="teamname" order={-1} textAlign="right">
                      <span style={{ fontSize: "30px", fontFamily: 'Bebas Neue', fontWeight: 400, display: "block", lineHeight: "30px" }}>
                        {getTeamScore(matchData, matchData.AwayTeamName)}
                      </span>
                      <span style={{ fontSize: "12px" }}>
                        {getTeamOvers(matchData, matchData.AwayTeamName)}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3} textAlign="end">
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
