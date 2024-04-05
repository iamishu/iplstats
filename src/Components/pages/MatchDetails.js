import { AppBar, Box, Divider, Grid, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import getTeamLogo from '../common/getTeamLogo';
import moment from 'moment';
import "../common/style.css";
import { getCommentryStartText, getTeamCode, getTeamOvers, getTeamScore } from '../utils/getTeamData';
import CountDownTimer from '../common/countdown/CountDown';
import PropTypes from "prop-types";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from "@mui/material/styles";
import MatchInfo from '../common/MatchInfo';
import MatchSquads from '../common/MatchSquads';
import MatchTeam from '../common/MatchTeam';

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

const MatchDetails = () => {

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

    const { id } = useParams();

    const [matchData, setMatchData] = useState();
    const [firstInnings, setFirstInnings] = useState();
    const [secondInnings, setSecondInnings] = useState();
    const [loading, setLoading] = useState(true);

    const loadMatchSummary = async () => {
        const response = await axios.get(`http://localhost:8080/matches/matchsummary/${id}`);
        let upcoming = [];
        if (response && response.status === 200) {
            setMatchData(response.data[0]);
            setTimeout(() => setLoading(false), 1000);
        } else {
            setTimeout(() => setLoading(false), 1000);
            alert(response.statusText);
        }
    };

    const loadFirstInning = async () => {
        const response = await axios.get(`http://localhost:8080/matches/innings1/${id}`);
        if (response && response.status === 200) {
            setFirstInnings(response.data);
            setTimeout(() => setLoading(false), 1000);
        } else {
            setTimeout(() => setLoading(false), 1000);
            alert(response.statusText);
        }
    }

    const loadSecondInning = async () => {
        const response = await axios.get(`http://localhost:8080/matches/innings2/${id}`);
        if (response && response.status === 200) {
            setSecondInnings(response.data);
            setTimeout(() => setLoading(false), 1000);
        } else {
            setTimeout(() => setLoading(false), 1000);
            alert(response.statusText);
        }
    }

    useEffect(() => {
        loadMatchSummary();
    }, []);

    useEffect(() => {
        if (matchData) {
            if (matchData.MatchStatus === "Live" || matchData.MatchStatus === "Post") {
                loadFirstInning();
                loadSecondInning();
            }
        }
    }, [matchData]);

    return (
        <Box>
            {matchData && (<>
                <Box sx={{ backgroundColor: "#061e59", color: "#fff" }}>
                    <Grid container spacing={2} alignItems="center" p={5}>
                        <Grid item xs={4}>
                            <Box className="matchDetailsSec">
                                <Box className="teamlogo" textAlign="center">
                                    <img
                                        src={getTeamLogo(matchData.HomeTeamName)}
                                        alt={matchData.HomeTeamName}
                                    />
                                    <br />
                                    <b>{getTeamCode(matchData, matchData.HomeTeamName)}</b>
                                </Box>
                                <Box className="teamname">
                                    <span className="score">
                                        {matchData.MatchStatus === "Live" || matchData.MatchStatus === "Post" ? (
                                            <span>
                                                <span style={{ fontSize: "40px", fontFamily: 'Bebas Neue', fontWeight: 400 }}>{getTeamScore(matchData, matchData.HomeTeamName)}</span>
                                                <br />
                                                {getTeamOvers(matchData, matchData.HomeTeamName)}
                                            </span>)
                                            : "Yet to Bat"}
                                    </span>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            {matchData.MatchStatus === "Live"
                                ? (
                                    <Box className="time" sx={{ textAlign: "center" }}>
                                        <svg height="10" width="10" class="blinking">
                                            <circle cx="5" cy="5" r="5" fill="red"></circle>
                                        </svg>{" "}
                                        <b style={{ color: "red" }}>Live</b>
                                    </Box>
                                ) : matchData.MatchStatus === "UpComing" ? (
                                    <CountDownTimer targetDate={matchData.MATCH_COMMENCE_START_DATE} />
                                ) : (
                                    // <Box className="matchOrder">{matchData.MatchRow > 70 ? matchData.MatchOrder : "Match " + matchData.MatchRow}</Box>
                                    <Box className="matchComments">{matchData.Comments}</Box>
                                )}
                        </Grid>
                        <Grid item xs={4}>
                            <Box className="matchDetailsSec">
                                <Box className="teamlogo" textAlign="center">
                                    <img
                                        src={getTeamLogo(matchData.AwayTeamName)}
                                        alt={matchData.AwayTeamName}
                                    />
                                    <br />
                                    <b>{getTeamCode(matchData, matchData.AwayTeamName)}</b>
                                </Box>
                                <Box className="teamname" order={-1} textAlign="right">
                                    <span className="score">
                                        {matchData.MatchStatus === "Live" || matchData.MatchStatus === "Post" ? (
                                            <span>
                                                <span style={{ fontSize: "40px", fontFamily: 'Bebas Neue', fontWeight: 400 }}>{getTeamScore(matchData, matchData.AwayTeamName)}</span>
                                                <br />
                                                {getTeamOvers(matchData, matchData.AwayTeamName)}
                                            </span>)
                                            : "Yet to Bat"}
                                    </span>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} my={2}>
                            <Box className="place" textAlign="center" fontSize="13px" lineHeight="18px" fontWeight={400}>
                                <span>
                                    {matchData.GroundName}
                                    {`, ${matchData.city}`}
                                </span>
                                <span className='matchdate'>{moment(matchData.MATCH_COMMENCE_START_DATE).format("DD MMM, YYYY")}</span>
                                <span className='matchtime'>{moment(matchData.MATCH_COMMENCE_START_DATE).format("h:mm A [IST]")}</span>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* <div dangerouslySetInnerHTML={{ __html: matchData.PreMatchCommentary }}></div> */}
            </>)}
            <Box
                sx={{
                    // bgcolor: "background.paper",
                    margin: "-25px auto 0",
                }}
            >
                <AppBar
                    position="static"
                    sx={{
                        backgroundColor: "#fff",
                        color: "#000",
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
                        <Tab label="Match Info" {...a11yProps(0)} sx={{
                            textTransform: "capitalize",
                            fontWeight: "600"
                        }} />
                        {matchData?.MatchStatus === "UpComing" ? <Tab label="Squad" {...a11yProps(1)} sx={{
                            textTransform: "capitalize",
                            fontWeight: "600"
                        }} /> : <Tab label="Team" {...a11yProps(1)} sx={{
                            textTransform: "capitalize",
                            fontWeight: "600"
                        }} />}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {matchData && (<MatchInfo data={matchData} />)}
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        {
                            matchData?.MatchStatus === "UpComing"
                                ? <MatchSquads matchId={matchData?.MatchID} />
                                : <MatchTeam matchId={matchData?.MatchID} />
                        }
                    </TabPanel>
                </SwipeableViews>
            </Box>
            <Grid container maxWidth="md" m="0 auto">
                {firstInnings && firstInnings.OverHistory.map((item, i) => (
                    <Box key={i} display="flex" alignItems="center" className="mcBall">
                        <Grid item md={2} textAlign="center">
                            <Box>
                                <span>{item.BallName}</span>
                                <br />
                                <i className='ovRun'>{item.BallRuns}</i>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" variant="middle" flexItem style={{
                            borderStyle: "dashed",
                            borderWidth: "1px"
                        }} />
                        <Grid item md={10}>
                            <h4 style={{ margin: "5px 0 0" }}>{getCommentryStartText(item.Commentry)}</h4>
                            <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: item.UPDCommentry }} />
                        </Grid>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default MatchDetails