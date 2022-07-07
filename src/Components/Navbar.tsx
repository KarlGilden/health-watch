import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from "../context/AuthContext";

type Anchor = "Menu";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    Menu: false
  });

  const {logout} = useAuth()

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box role="presentation" sx={{ background: "whtie", height:"100%" }}>
      <List>
        {[
          "Dashboard",
          "My health records",
          "Contact health professional",
          "Book Appointment",
          "Reminders",
          "Setting"
        ].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <FiberManualRecordIcon fontSize="small" sx={{color: "#FE675D", paddingRight: 1}}/>
              <ListItemText primary={text} sx={{ color: "#FE675D" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" fullWidth sx={{color:"white", background: "#FE675D", bottom: 0, position: "absolute", marginBottom: 8}} onClick={()=>{logout()}}>
        Sign Out
      </Button>
      <Divider />
    </Box>
  );

  return (
    <div>
      {(["Menu"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list()}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
