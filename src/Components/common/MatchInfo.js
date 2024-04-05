import { Box, Grid } from '@mui/material'
import React from 'react'

const MatchInfo = ({ data }) => {
    return (
        <Box maxWidth="sm" m="0 auto">
            <h3>Match Info</h3>
            <table className='mi-table'>
                <tr>
                    <th>Venue</th>
                    <td>{data.GroundName}<br /><span>{data.city}</span></td>
                </tr>
                <tr>
                    <th>On Field Umpires</th>
                    <td>{data.GroundUmpire1}, {data.GroundUmpire2}</td>
                </tr>
                <tr>
                    <th>Third Umpire</th>
                    <td>{data.ThirdUmpire}</td>
                </tr>
            </table>
        </Box>
    )
}

export default MatchInfo