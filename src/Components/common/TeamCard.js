import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const TeamCard = ({ data }) => {
    return (
        <Grid item md={2.3} sm={4} xs={6}>
            <Card variant="outlined">
                <CardContent style={{ padding: "0 0 10px", position: "relative" }}>
                    {data?.IsNonDomestic === "1" && (
                        <AirplanemodeActiveIcon sx={{
                            position: "absolute",
                            top: "5px",
                            left: "5px",
                            backgroundColor: "#ededed",
                            padding: "4px",
                            fontSize: "18px",
                            borderRadius: "100%"
                        }} />
                    )}
                    <img src={data?.PlayerImage} width="100%" />
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "0px",
                        color: "#02458d"
                    }}>
                        {data?.PlayerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" fontWeight={600} fontSize="12px">
                        {data?.PlayerSkill === "Bowler"
                            ? data?.BowlingProficiency
                            : data?.PlayerSkill === "Batsman"
                                ? data?.BattingType
                                : data?.PlayerSkill}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default TeamCard