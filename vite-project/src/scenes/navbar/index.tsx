import {useState} from 'react'
import {Link} from "react-router-dom"
import {Box,Typography,useTheme} from "@mui/material"
import FlexBetween from '@/components/FlexBetween';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

type Props = object;

const Navbar = (props: Props) => {
    //grabbing themes setting from theme.ts
    const {palette}=useTheme();
    const [selected,setSelected]=useState("dashboard");
  return (
  <FlexBetween mb="0.25rem" padding="0.5 rem 0rem" color="#55423d">
    {/*Left part */}
    <FlexBetween gap="0.75rem">
        <AllInclusiveIcon sx={{fontSize:"20px"}}/>
        <Typography variant="h3" fontSize="20px" color="#55423d">
            Dashie |
        </Typography>
        <Typography variant="h6" fontSize="15px" color="#55423d">
            making understanding data easi-er
        </Typography>
    </FlexBetween>
    {/*Right part */}
    <FlexBetween gap="2rem">
        <Box sx={{"&:hover":{color:palette.primary[100]}}}>
            <Link
            to="/"
            onClick={()=> setSelected("dashboard")}
            style={{
                color:selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration:"inherit"
            }}
            >
            Dashboard
            </Link>
        </Box>
        <Box sx={{"&:hover":{color:palette.primary[100]}}}>
            <Link
            to="/predictions"
            onClick={()=> setSelected("predictions")}
            style={{
                color:selected === "predictions" ? "inherit" : palette.grey[700],
                textDecoration:"inherit"
            }}
            >
            Predictions
            </Link>
        </Box>
    </FlexBetween>
  </FlexBetween>);
};

export default Navbar;