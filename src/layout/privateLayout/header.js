import React, { useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
// import { Scrollbars } from "react-custom-scrollbars";
import { Paper, Box, Typography, Menu, MenuItem } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/light";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { AppBar, Toolbar, IconButton, Avatar } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SettingsIcon from "@material-ui/icons/Settings";
import logo from "../../theme/assets/images/inner-logo.png";
import smallLogo from "../../theme/assets/images/small-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { menu } from "./menu";
import { userLogout } from "../../store/actions/user";
const AppHeader = (props) => {
  // const opneNavMenu = () => {
  //   document.body.classList.add('openMenu');
  // }
  // const closeNavMenu = () => {
  //   document.body.classList.remove('openMenu');
  // }
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("");

  const openMenu = () => {
    clicked ? setClicked("") : setClicked("navMenuOpen navMenuClose");
    document.body.classList.remove("openMenu");
    console.log(window.location.pathname);
  };

  const closeMenu = () => {
    clicked ? setClicked("") : setClicked("navMenuOpen navMenuClose");
    document.body.classList.add("openMenu");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const { dispatch } = props;
    console.log("componentDidMount", "Login");
    dispatch(userLogout());
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper square className={`sidebarNavMenu ${clicked && "openNavMenu"}`}>
          <Box
            component="a"
            pl={1}
            pr={1}
            display="flex"
            color="text.hint"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="70px"
          >
            {/* <Box
              className="inner-logo"
              textAlign="center"
              maxWidth="150px"
              mr={3}
            >
              <img src={logo} alt="img" className="login-logo" />
            </Box>
            <Box
              component="span"
              flexDirection="column"
              className="navMenu"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src={smallLogo} alt="img" className="small-logo" />
            </Box> */}
            <Box
              component="span"
              flexDirection="column"
              className="openNavMenu"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={openMenu}
              bgcolor="primary.menuCloseBg"
              color="text.primary"
            >
              <NavigateBeforeIcon color="inherit" />
            </Box>
            <Box
              component="span"
              flexDirection="column"
              className="closeMenu"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={closeMenu}
              bgcolor="primary.menuCloseBg"
              color="text.primary"
            >
              <NavigateBeforeIcon color="inherit" />
            </Box>
          </Box>
          {menu.map((item, key) => (
            <MenuItm key={key} item={item} />
          ))}
        </Paper>
        <div className="appHeader">
          <AppBar position="static" color="inherit">
            <Toolbar>
              <Box display="flex" alignItems="center" ml="auto">
                <IconButton className="headerRightIcons">
                  <SettingsIcon style={{ fontSize: 24 }} />
                </IconButton>

                <Box
                  className="badgeStatus"
                  width="40px"
                  height="40px"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://placeimg.com/40/40/people/1"
                    edge="end"
                    style={{ fontSize: 24 }}
                    aria-label="account of current user"
                    aria-haspopup="true"
                    className="headerRightIcons"
                    color="primary"
                  >
                    C
                  </Avatar>
                  <span className="status"></span>
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="dropdown-menu"
                >
                  <MenuItem onClick={handleClose}>
                    <Box component="span" color="grey.50" mr={1}>
                      <ExitToAppIcon color="inherit" />
                    </Box>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(AppHeader);

const MenuItm = ({ item }) => {
  return <SingleLevel item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <Box
      button
      component={Link}
      to={item.to}
      p={1}
      display="flex"
      color="text.hint"
      alignItems="center"
      justifyContent="center"
      className={
        item.to === window.location.pathname
          ? "navMenuActive navMenuList"
          : "navMenuList"
      }
    >
      <Box
        component="span"
        className="navMenuIcon"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={50}
      >
        {item.icon}
      </Box>
      <Box
        component="span"
        color="text.primary"
        mt={2}
        className="menuTextList"
      >
        <Typography variant="button" display="block" gutterBottom>
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
};

export function hasChildren(item) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}
