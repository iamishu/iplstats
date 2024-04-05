import CSKLogo from "../../images/team-logos/CSK.png";
import DCLogo from "../../images/team-logos/DC.png";
import DECLogo from "../../images/team-logos/DEC.png";
import GTLogo from "../../images/team-logos/GT.png";
import KKLogo from "../../images/team-logos/KK.png";
import LSGLogo from "../../images/team-logos/LSG.png";
import MILogo from "../../images/team-logos/MI.png";
import PBKSLogo from "../../images/team-logos/PBKS.png";
import RCBLogo from "../../images/team-logos/RCB.png";
import RRLogo from "../../images/team-logos/RR.png";
import SRHLogo from "../../images/team-logos/SRH.png";
import TBDLogo from "../../images/team-logos/TBD.png";

const getTeamLogo = (name) => {
  let logo;
  if (name === "Chennai Super Kings") {
    logo = CSKLogo;
  } else if (name === "Delhi Capitals") {
    logo = DCLogo;
  } else if (name === "Gujarat Titans") {
    logo = GTLogo;
  } else if (name === "Deccan Chargers") {
    logo = DECLogo;
  } else if (name === "Kolkata Knight Riders") {
    logo = KKLogo;
  } else if (name === "Lucknow Super Giants") {
    logo = LSGLogo;
  } else if (name === "Punjab Kings") {
    logo = PBKSLogo;
  } else if (name === "Rajasthan Royals") {
    logo = RRLogo;
  } else if (
    name === "Royal Challengers Bangalore" ||
    name === "Royal Challengers Bengaluru"
  ) {
    logo = RCBLogo;
  } else if (name === "Sunrisers Hyderabad") {
    logo = SRHLogo;
  } else if (name === "Mumbai Indians") {
    logo = MILogo;
  } else if (name === "TBD") {
    logo = TBDLogo;
  }

  return logo;
};

export default getTeamLogo;
