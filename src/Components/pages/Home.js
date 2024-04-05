import {
  Box,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchCard from "../common/MatchCard";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import NoResultCard from "../common/NoResultCard";
import moment from "moment";
import ResultCard from "../common/ResultCard";
import LiveMatchCard from "../common/LiveMatchCard";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import PointTable from "./PointTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{
        textTransform: "capitalize"
      }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setLoading(true);
    setValue(newValue);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleChangeIndex = (index) => {
    setLoading(true);
    setValue(index);
    setTimeout(() => setLoading(false), 1000);
  };
  const [upcomingMatchList, setUpcomingMatchList] = useState([]);
  const [liveMatchList, setLiveMatchList] = useState([]);
  const [resultMatchList, setResultMatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSchedule = async () => {
    const response = await axios.get("http://localhost:8080/matches");
    let upcoming = [];
    if (response && response.status === 200) {
      let upcoming = [];
      let live = [];
      let result = [];
      if (response.data.length > 0) {
        response.data.map((item) => {
          if (item.MatchStatus === "UpComing" || item.MatchStatus === "Live") {
            upcoming.push(item);
          } else if (item.MatchStatus === "Post") {
            result.push(item);
          }
        });
      }
      setUpcomingMatchList(upcoming);
      setLiveMatchList(live);
      setResultMatchList(result);
      setTimeout(() => setLoading(false), 1000);
    } else {
      setTimeout(() => setLoading(false), 1000);
      alert(response.statusText);
    }
  };

  console.log(liveMatchList);

  useEffect(() => {
    loadSchedule();
  }, []);

  return (
    <Box>
      <Grid container spacing={4} style={{ width: "100%", margin: "0 auto" }}>
        <Grid item xs={0} md={1}></Grid>
        <Grid item xs={12} md={10} p={4}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            sx={{
              bgcolor: "background.paper",
              margin: "0 auto",
            }}
          >
            <AppBar
              position="static"
              sx={{
                backgroundColor: "#18184a",
                borderRadius: "35px",
                maxWidth: 415,
                margin: "0 auto"
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Fixture" {...a11yProps(0)} sx={{
                  textTransform: "capitalize",
                  fontWeight: "600"
                }} />
                <Tab label="Result" {...a11yProps(1)} sx={{
                  textTransform: "capitalize",
                  fontWeight: "600"
                }} />
                <Tab label="Points Table" {...a11yProps(2)} sx={{
                  textTransform: "capitalize",
                  fontWeight: "600"
                }} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Timeline>
                  {upcomingMatchList?.length > 0 &&
                    upcomingMatchList.map((item) => (
                      <TimelineItem
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                          },
                        }}
                      >
                        <TimelineOppositeContent>
                          <Box className="match">{item.MatchRow > 70 ? item.MatchOrder : "Match " + item.MatchRow}</Box>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot variant="outline" color="#18184a" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          {item.MatchStatus === "Live" ? <LiveMatchCard data={item} key={item.MatchID} /> :
                            <MatchCard data={item} key={item.MatchID} />}
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                </Timeline>
                {upcomingMatchList.length === 0 && <NoResultCard />}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Timeline>
                  {resultMatchList?.length > 0 &&
                    resultMatchList.map((item) => (
                      <TimelineItem
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                          },
                        }}
                      >
                        <TimelineOppositeContent>
                          <Box className="match">{item.MatchRow > 70 ? item.MatchOrder : "Match " + item.MatchRow}</Box>
                          <Box
                            sx={{
                              fontSize: "13px",
                              fontWeight: 600,
                              marginTop: "50px",
                              color: "#19398a"
                            }}
                          >
                            {item.Comments}
                          </Box>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot variant="outline" color="#18184a" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <ResultCard data={item} key={item.MatchID} />
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                </Timeline>
                {resultMatchList.length === 0 && <NoResultCard />}
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <PointTable />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Grid>
        <Grid item xs={0} md={1}></Grid>
      </Grid>
    </Box>
  );
}
