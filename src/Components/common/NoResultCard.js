import React from "react";
import { Box, Card, CardContent } from "@mui/material";

const NoResultCard = () => {
  return (
    <Box>
      <Card className="match-card" style={{ margin: "0 auto 20px" }}>
        <CardContent style={{ position: "relative", zIndex: 1 }}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h5>No Result Found</h5>
            </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default NoResultCard;
