import WidgitWrapper from "components/WidgitWrapper";
import FlexBetween from "components/FlexBetween";
import { Typography, useTheme } from "@mui/material";



const AdvertWidget = ()=>{
    const {palette} = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium



    return(

      <WidgitWrapper>
        <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
                Main Sponsor
            </Typography>
            <Typography  color={medium}> Create Add</Typography>
        </FlexBetween>
          <img
           width='100%'
           height='auto' 
           alt="Advert" 
           src="http://localhost:3001/assets/info4.jpg"
           sx={{borderRadius:"0.75rem", margin:"0.75rem  0" }}/>
         
        <FlexBetween>
           <Typography color={main}>Namibia CBS On Weekend</Typography>
           <Typography color={medium}>yournamibia.com</Typography>    
        </FlexBetween>
         <Typography color={medium} m="0.5rem 0">
            Namibia, Your Mirror to the Nature of the Southern Africa and Beyond
         </Typography>
      </WidgitWrapper>

    )

}


export default AdvertWidget