import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import decode from "jwt-decode";
import clsx from "clsx";
import { makeStyles, useTheme, alpha } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Assignment } from "@material-ui/icons";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import { Route, Switch, Redirect } from "react-router-dom";
import ProblemSpace from "./ProblemSpace/problemSpace";
import Profile from "./Profile";
import Problem from "./ProblemSpace/problem";
import Auth from "./Auth/Auth";
import MoreIcon from "@material-ui/icons/MoreVert";
import ContestSpace from "./ContestSpace/ContestSpace";
import PlaylistSpace from "./PlaylistSpace/PlaylistSpace";
import AddContest from "./ContestSpace/AddContest";
import AddPlaylist from "./PlaylistSpace/AddPlaylist";
import AddProblem from "./ContestSpace/AddProblem";
import { useHistory } from "react-router";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";
import Submissions from "./ProblemSpace/Submisssions";
import Pds from "./PersonalDevelopementSpace/pds";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: "100px",
    padding: theme.spacing(3),
    backgroundColor: "#212121",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function MiniDrawer(props) {
  console.log("hgey i am working");
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  user != null ? console.log(user["result"]["name"]) : console.log("no user");

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            GoCode
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {user != null ? (
              // <Typography variant="h6">{user?.result.name}</Typography>
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
                onClick={logout}
              >
                Logout{" "}
              </Button>
            ) : (
              <a href="/auth">
                <Button
                  variant="outlined"
                  style={{ color: "white", borderColor: "white" }}
                >
                  Login{" "}
                </Button>
              </a>
            )}

            {/* {user['result']['name']!=null ?<Button variant="outlined" style={{color:'white'} } onClick={logout}>Logout </Button>:<a href="/auth"><Button variant="outlined" style={{color:'white'} }>Login </Button></a>} */}
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* <List>
          {['Problem Space', 'Contest Space', 'User Space', 'PlayList of Problems'].map((text, index) => (
            <ListItem button key={text} onClick={()=>props.history.push('/problems')}>
              <ListItemIcon>{index === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <ListItem
          button
          key={"Problem Space"}
          onClick={() => history.push("/problems")}
        >
          <ListItemIcon>
            {" "}
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Problem Space" />
        </ListItem>
        <ListItem
          button
          key={"Contest Space"}
          onClick={() => history.push("/contests")}
        >
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Contest Space" />
        </ListItem>
        <ListItem
          button
          key={"Personal Development Space"}
          onClick={() => history.push("/pds")}
        >
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Personal Development Space" />
        </ListItem>
        <ListItem
          button
          key={"Playlist of Problems"}
          onClick={() => history.push("/playlists")}
        >
          <ListItemIcon>
            <FeaturedPlayListIcon />
          </ListItemIcon>
          <ListItemText primary="Playlist of Problems" />
        </ListItem>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className="App">
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route exact path="/">
              <Redirect to="/problems" />
            </Route>

            <Route exact path="/problems" component={ProblemSpace} />

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/contests" component={ContestSpace} />
            <Route exact path="/pds" component={Pds} />
            {/* <Route exact path='/contests' component={ContestSpace}>
            <ContestSpace />
          </Route> */}
            <Route exact path="/playlists" component={PlaylistSpace} />
            <Route exact path="/addcontest/:id" component={AddContest} />
            <Route exact path="/addplaylist/:id" component={AddPlaylist} />
            <Route exact path="/addproblem" component={AddProblem} />
            <Route path="/problem/:id" component={Problem} />
            <Route exact path="/submissions/:id" component={Submissions} />
          </Switch>


        </div>
      </main>
    </div>
  );
}
