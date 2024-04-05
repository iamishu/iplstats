import { AppBar, Box, Card, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from "@mui/material/styles";
import TeamCard from './TeamCard';

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

const MatchSquads = ({ matchId }) => {

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
    const [squadData, setSquadData] = useState();
    const [loading, setLoading] = useState(true);

    const [squadA, setSquadA] = useState();
    const [squadB, setSquadB] = useState();

    const loadMatchSquad = async () => {
        setLoading(false);
        const response = await axios.get(`http://localhost:8080/matches/squad/${matchId}`);
        if (response && response.status === 200) {
            setSquadData(response.data);
            setTimeout(() => setLoading(false), 1000);
        } else {
            setTimeout(() => setLoading(false), 1000);
            alert(response.statusText);
        }
    };

    const handleGroupSquadBySkill = (data) => {
        const teamA = {
            batter: [],
            bowler: [],
            allRounders: [],
        };
        data.squadA.map(item => {
            if (item.PlayerSkill === "Wicket Keeper" || item.PlayerSkill === "Batsman") {
                teamA.batter.push(item)
            } else if (item.PlayerSkill === "Bowler") {
                teamA.bowler.push(item)
            } else if (item.PlayerSkill === "All Rounder") {
                teamA.allRounders.push(item)
            }
        })
        const teamB = {
            batter: [],
            bowler: [],
            allRounders: [],
        };
        data.squadB.map(item => {
            if (item.PlayerSkill === "Wicket Keeper" || item.PlayerSkill === "Batsman") {
                teamB.batter.push(item)
            } else if (item.PlayerSkill === "Bowler") {
                teamB.bowler.push(item)
            } else if (item.PlayerSkill === "All Rounder") {
                teamB.allRounders.push(item)
            }
        })
        setSquadA(teamA);
        setSquadB(teamB);
    }

    useEffect(() => {
        loadMatchSquad();
    }, [])

    useEffect(() => {
        if (squadData) {
            handleGroupSquadBySkill(squadData);
        }
    }, [squadData])
    return (
        <Box
            sx={{
                // bgcolor: "background.paper",
                margin: "0px auto 0",
            }}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "35px",
                    maxWidth: 200,
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
                    <Tab label={squadData && squadData.squadA[0].TeamCode} {...a11yProps(0)} sx={{
                        textTransform: "capitalize",
                        fontWeight: "600",
                        fontSize: "14px"
                    }} />
                    <Tab label={squadData && squadData.squadB[0].TeamCode} {...a11yProps(1)} sx={{
                        textTransform: "capitalize",
                        fontWeight: "600",
                        fontSize: "14px"
                    }} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <h3 className='skillTitle'>Batters</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadA && squadA?.batter.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                    <h3 className='skillTitle'>All Rounders</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadA && squadA?.allRounders.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                    <h3 className='skillTitle'>Bowlers</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadA && squadA?.bowler.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <h3 className='skillTitle'>Batters</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadB && squadB?.batter.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                    <h3 className='skillTitle'>All Rounders</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadB && squadB?.allRounders.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                    <h3 className='skillTitle'>Bowlers</h3>
                    <Grid container spacing={2} rowGap={2}>
                        {squadB && squadB?.bowler.map((item, i) => (<TeamCard data={item} key={i} />))}
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </Box>
    )
}

export default MatchSquads