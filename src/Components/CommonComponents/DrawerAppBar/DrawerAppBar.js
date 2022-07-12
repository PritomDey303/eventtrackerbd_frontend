import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const drawerWidth = 240;
const navItems = [
  [1, "Home", "/"],
  [2, "Create Event", "/create-event"],
  [3, "Your Events", "/your-events"],
  [4, "Sign Up", "/signup"],
  [5, "Login", "/signin"],
];
//activeStyle for navLink with animation

//active style for navLink with animated border bottom
const activeStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "5px",
  padding: "10px",
  margin: "5px",
  fontWeight: "bold",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    color: "black",
    borderRadius: "5px",
    padding: "5px",
    margin: "5px",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

const inactiveStyle = {
  color: "white",
  backgroundColor: "transparent",
  borderRadius: "5px",
  padding: "5px",
  margin: "5px",
  fontWeight: "bold",
  fontSize: "1.2em",
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "1px",

  transition: "all 0.3s ease-in-out",
  WebkitTransition: "all 0.3s ease-in-out",
  MozTransition: "all 0.3s ease-in-out",
  OTransition: "all 0.3s ease-in-out",
  msTransition: "all 0.3s ease-in-out",
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "black", height: "100%" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* logo image setting here */}
        <img src={logo} alt="logo" style={{ width: "150px" }} />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                to={item[2]}
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography variant="subtitle1">{item[1]}</Typography>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton key="notification" sx={{ textAlign: "center" }}>
            <NavLink
              to="/notification"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>
      {/* here */}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "black", color: "whiite" }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "black", color: "white", padding: "10px" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img src={logo} alt="logo" style={{ width: "200px" }} />
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "none" },
              marginLeft: "auto",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "200px",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item[0]}>
                <NavLink
                  to={item[2]}
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  <Typography variant="subtitle1">{item[1]}</Typography>
                </NavLink>
              </Button>
            ))}

            <NavLink
              to="/notification"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
