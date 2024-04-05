import {
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1b3d89",
    color: theme.palette.common.white,
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PointTable() {
  const [pointList, setPointList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPointsTable = async () => {
    const response = await axios.get("http://localhost:8080/pointtable");
    if (response && response.status === 200) {
      setPointList(response.data);
      setTimeout(() => setLoading(false), 1000);
    } else {
      setTimeout(() => setLoading(false), 1000);
      alert(response.statusText);
    }
  };

  useEffect(() => {
    loadPointsTable();
  }, []);
  console.log(pointList);
  return (
    <Box>
      <h1>Points Table</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>POS</StyledTableCell>
                <StyledTableCell>TEAM</StyledTableCell>
                <StyledTableCell>P</StyledTableCell>
                <StyledTableCell>W</StyledTableCell>
                <StyledTableCell>L</StyledTableCell>
                <StyledTableCell>NR</StyledTableCell>
                <StyledTableCell>NRR</StyledTableCell>
                <StyledTableCell>PTS</StyledTableCell>
                <StyledTableCell>RECENT FORM</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pointList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "700" }}
                  >
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "15px", height: "40px" }}>
                        <img
                          src={row.TeamLogo}
                          alt={row.TeamName}
                          height="100%"
                        />
                      </Box>
                      <Box sx={{ fontWeight: "700" }}>{row.TeamCode}</Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{row.Matches}</StyledTableCell>
                  <StyledTableCell>{row.Wins}</StyledTableCell>
                  <StyledTableCell>{row.Loss}</StyledTableCell>
                  <StyledTableCell>{row.Tied}</StyledTableCell>
                  <StyledTableCell>{row.NetRunRate}</StyledTableCell>
                  <StyledTableCell>{row.Points}</StyledTableCell>
                  <StyledTableCell>{row.Performance.split(",").map(item => <span className={`pt-sts ${item}`}>{item}</span>)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
