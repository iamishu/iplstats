import {
  Box,
  Grid,
  AppBar,
  Backdrop,
  CircularProgress,
  Toolbar,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultCard from "../common/ResultCard";
import { useTheme } from "@mui/material/styles";
import NoResultCard from "../common/NoResultCard";

export default function Result() {
  const [resultMatchList, setResultMatchList] = useState([]);
  const [competitionList, setCompetitionList] = useState([]);
  const [currentCompetition, setCurrentCompetition] = useState({});
  const [loading, setLoading] = useState(true);

  const loadSchedule = async (id) => {
    setLoading(true);
    const response = await axios.get("http://localhost:8080/result/" + id);
    if (response && response.status === 200) {
      let result = [];
      if (response.data.length > 0) {
        response.data.map((item) => {
          result.push(item);
        });
      }
      setResultMatchList(result);
      setTimeout(() => setLoading(false), 1000);
    } else {
      setTimeout(() => setLoading(false), 1000);
      alert(response.statusText);
    }
  };

  const loadCompetition = async () => {
    const response = await axios.get("http://localhost:8080/competition");
    if (response && response.status === 200) {
      let result = [];
      if (response.data.length > 0) {
        response.data.map((item) => {
          if (item.completed === 1) {
            result.push(item);
          }
        });
      }
      setCompetitionList(result);
      setCurrentCompetition(result[0]);
    } else {
      setTimeout(() => setLoading(false), 1000);
      alert(response.statusText);
    }
  };

  useEffect(() => {
    loadCompetition();
  }, []);

  useEffect(() => {
    if (currentCompetition && Object.keys(currentCompetition).length > 0) {
      loadSchedule(currentCompetition.CompetitionID);
    }
  }, [currentCompetition]);

  const handleChange = (event) => {
    competitionList.length > 0 &&
      competitionList.map((item) => {
        if (item.CompetitionID === event.target.value) {
          setCurrentCompetition(item);
        }
      });
  };

  return (
    <Box>
      <Grid container spacing={4} style={{ width: "100%", margin: "0 auto" }}>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6} p={4}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            sx={{
              bgcolor: "background.paper",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            <AppBar
              position="static"
              sx={{ backgroundColor: "#18184a", borderRadius: "35px" }}
            >
              <Toolbar>
                <h3 style={{ marginRight: "auto" }}>Result</h3>
                <FormControl
                  sx={{ m: 1, minWidth: 150, color: "#fff" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small" style={{ color: "#fff" }}>
                    Select Year
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={currentCompetition.CompetitionID}
                    label="Select Year"
                    onChange={handleChange}
                    style={{ color: "#fff" }}
                  >
                    {competitionList.map((comp, index) => (
                      <MenuItem value={comp.CompetitionID} key={index}>
                        {comp.CompetitionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Toolbar>
            </AppBar>
            <Box my={4}>
              {resultMatchList?.length > 0 &&
                resultMatchList.map((item) => (
                  <ResultCard data={item} key={item.MatchID} />
                ))}
              {resultMatchList.length === 0 && <NoResultCard />}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={3}></Grid>
      </Grid>
    </Box>
  );
}
