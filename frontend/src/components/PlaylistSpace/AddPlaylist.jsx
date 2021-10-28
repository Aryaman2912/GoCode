import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Row } from "react-grid-system";
import Select from "react-select";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useHistory } from "react-router";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  h1: {
    marginTop: "10px",
    color: "black",
    fontSize: "25px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgb(79, 98, 148)",
  },

  form: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  p: {
    color: "#bf1650",
    textAlign: "center",
  },

  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "10px 15px",
    marginBottom: "10px",
    fontSize: "14px",
  },

  label: {
    lineHeight: "2",
    textAlign: "left",
    display: "block",
    marginBottom: "13px",
    marginTop: "20px",
    color: "black",
    fontSize: "14px",
    fontWeight: "200",
  },

  submitButton: {
    background: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    marginTop: "40px",
    padding: "20px",
    fontSize: "16px",
    fontWeight: "100",
    letterSpacing: "10px",
    display: "block",
    appearance: "none",
    borderRadius: "4px",
    width: "100%",
  },

  container: {
    backgroundColor: "#2f3956",
    marginTop: "100px",
    paddingBottom: "30px",
    paddingTop: "20px",
    borderRadius: "25px",
  },

  dropdown: {
    width: "50%",
  },
}));
const tags = [
  { value: "flows", label: "flows" },
  { value: "graph matchings", label: "graph matchings" },
  { value: "graphs", label: "graphs" },
  { value: "greedy", label: "greedy" },
  { value: "binary search", label: "binary search" },
  { value: "dp", label: "dp" },
  { value: "geometry", label: "geometry" },
  { value: "brute force", label: "brute force" },
  { value: "data structures", label: "data structures" },
  { value: "implementation", label: "implementation" },
  { value: "sortings", label: "sortings" },
  { value: "constructive algorithms", label: "constructive algorithms" },
  { value: "two pointers", label: "two pointers" },
  { value: "dfs and similar", label: "dfs and similar" },
  { value: "hashing", label: "hashing" },
  { value: "bitmasks", label: "bitmasks" },
  { value: "meet-in-the-middle", label: "meet-in-the-middle" },
  { value: "combinatorics", label: "combinatorics" },
  { value: "math", label: "math" },
  { value: "dsu", label: "dsu" },
  { value: "divide and conquer", label: "divide and conquer" },
  { value: "strings", label: "strings" },
  { value: "interactive", label: "interactive" },
  { value: "number theory", label: "number theory" },
  { value: "shortest paths", label: "shortest paths" },
  { value: "trees", label: "trees" },
  { value: "probabilities", label: "probabilities" },
  { value: "string suffix structures", label: "string suffix structures" },
  { value: "fft", label: "fft" },
  { value: "matrices", label: "matrices" },
  { value: "2-sat", label: "2-sat" },
  { value: "ternary search", label: "ternary search" },
  { value: "games", label: "games" },
  { value: "chinese remainder theorem", label: "chinese remainder theorem" },
  { value: "dfs", label: "dfs" },
  { value: "Array", label: "Array" },
  { value: "trie", label: "trie" },
  { value: "linked list", label: "linked list" },
  { value: "sliding window", label: "sliding window" },
  { value: "stack", label: "stack" },
  { value: "queue", label: "queue" },
];
const AddPlaylist = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loadingProblemSubmit,setloadingProblemSubmit] = useState(false);
  const onSubmit = (data) => {
    // data['tags'] = selectedOptions;
    // data['hidden'] = true;
    // data['contestId'] = props.match.params.id;
    console.log(data)
    setloadingProblemSubmit(true);
    console.log(props);
    axios.post(`http://localhost:5000/playlists/edit/${props.match.params.id}`,
    data
    )
      .then((res) => {
        setloadingProblemSubmit(false)
        setOpen(false);

      })
      .catch((err) => console.log(err));
    // axios.post('http://localhost:5000/playlists/create',
    //   data, {headers: headers}
    // )
    //   .then((res) => {
    //     console.log(res.data._id)
    //     history.push('/addplaylist/' + res.data._id)
    //   })
    //   .catch((err) => console.log(err))
  };
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "grey",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Challenges" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        style={{
          display: "auto",
          minHeight: "50rem",
          background: "#424242",
        }}
      >
        Item One
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{
          display: "auto",
          minHeight: "50rem",
          background: "#424242",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              color: "white",
              padding: "1rem 2rem ",
              borderColor: "white",
              // marginLeft: "auto",
              background: "#006633",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            <Row>
              <AddIcon />
              <Typography
                style={{
                  marginLeft: "10px",
                }}
              >
                Add a Challenge
              </Typography>
            </Row>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Problem</DialogTitle>
            <DialogContent
              style={{
                width: "35rem",
              }}
            >
              <DialogContentText></DialogContentText>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={classes.label} htmlFor="problemName">
                  Problem Name:
                </label>

                <input
                  className={classes.input}
                  {...register("problemName", {
                    required: "Problem name cannot be empty.",
                  })}
                  id="problemName"
                />
                {errors.problemName && (
                  <span className={classes.p}>
                    {errors.problemName.message}
                  </span>
                )}

                {/* <label className={classes.label} htmlFor="problemStatement">
                  Problem Statement:{" "}
                </label>
                <textarea
                  name="problemStatement"
                  placeholder="Enter the problem statement"
                  className={classes.input}
                ></textarea>
                {errors.problemStatement && (
                  <span className={classes.p}>
                    {errors.problemStatement.message}
                  </span>
                )}
                <label className={classes.label} htmlFor="tags">
                  Tags:{" "}
                </label>
                <Select className={classes.dropdown} isMulti options={tags} />
                <label className={classes.label} htmlFor="sampleInput">
                  Sample input:{" "}
                </label>
                <textarea
                  style={{
                    height: "8rem",
                  }}
                  name="sampleInput"
                  placeholder="Separate sample inputs using ~                                                                                                                                                       
                  Ex:                                                                                                                                                             
                  abc                                                                                                                                                                                                                                            
                  ~                                                                                                                            
                  def                                                                                                                                           
                  ~"
                  className={classes.input}
                ></textarea>
                <label className={classes.label} htmlFor="sampleInput">
                  Sample output:{" "}
                </label>
                <textarea
                  style={{
                    height: "8rem",
                  }}
                  name="sampleOutput"
                  placeholder="Separate sample outputs using ~                                                                                                                                                       
                  Ex:                                                                                                                                                             
                  123                                                                                                                                                                                                                                            
                  ~                                                                                                                            
                  456                                                                                                                                          
                  ~"
                  className={classes.input}
                ></textarea>
                <label className={classes.label} htmlFor="testInputs">
                  Test inputs:{" "}
                </label>
                <textarea
                  name="testInputs"
                  placeholder="Enter Testinputs similar to sample inputs"
                  className={classes.input}
                ></textarea>
                <label className={classes.label} htmlFor="testOutputs">
                  Test outputs:{" "}
                </label>
                <textarea
                  name="testOutputs"
                  placeholder="Enter Testoutputs similar to sample outputs"
                  className={classes.input}
                ></textarea> */}
                {loadingProblemSubmit ? < CircularProgress style={{ display: "flex", justifyContent: "center" }} disableShrink /> :
        
                <input
                  className={classes.submitButton}
                  value="Next"
                  type="submit"
                />
                }
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={handleClose} color="primary">
                    Subscribe
                  </Button> */}
            </DialogActions>
          </Dialog>
        </div>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        style={{
          display: "auto",
          minHeight: "50rem",
          background: "#424242",
        }}
      >
        Item Three
      </TabPanel>
    </div>
  );
};

export default AddPlaylist;
