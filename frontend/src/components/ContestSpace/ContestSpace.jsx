import { useEffect, useState, React } from "react";
import { useHistory } from "react-router-dom";
import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import ReactLoading from "react-loading";
import Contest from "./Contest";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Row } from "react-grid-system";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "./styles";
import { useForm } from "react-hook-form";
import { API } from "../../api/index";
import axios from "axios";
import { domain } from "../../constants/config";
const ContestSpace = () => {
  // console.log(JSON.parse(localStorage.getItem("profile")));
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    // // console.log(storage)
    if (storage === null) {
      history.push("/auth");
      return;
    }
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    };
    fetch(`${domain}/api/contests`, { headers: headers })
      .then((data) => data.json())
      .then((data) => {
        let tempcontests = [];
        data.forEach((contest) => {
          if (contest.isPublic) {
            tempcontests.push(contest);
          }
        });
        setContests(tempcontests);
        setLoading(false);
      });
  }, []);

  // // console.log(contests);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    // // console.log(storage)
    if (storage === null) {
      history.push("/auth");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const [formData, setFormData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleSwitchChange = (event) => {
    // console.log(state.checkedB);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onSubmit = (data) => {
    const time = data.time.split(":");
    data.date.setHours(time[0]);
    data.date.setMinutes(time[1]);
    const userId = JSON.parse(localStorage.getItem("profile"))["result"]["_id"];
    data["hostId"] = userId;
    data["duration"] = String(data["duration"]) + " hrs";
    data["isPublic"] = state.checkedB;
    delete data["time"];
    const storage = JSON.parse(localStorage.getItem("profile"));
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${domain}/api/addcontest`, data, { headers: headers })
      .then((res) => history.push("/addcontest/" + res.data.result._id))
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <ReactLoading
            type={loadingOptions.type}
            color={loadingOptions.color}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{
                  color: "white",
                  padding: "1rem 2rem ",
                  borderColor: "white",
                  marginLeft: "auto",
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
                    Create Contest
                  </Typography>
                </Row>
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Create Contest</DialogTitle>
                <DialogContent
                  style={{
                    width: "35rem",
                  }}
                >
                  <DialogContentText></DialogContentText>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <label className={classes.label} htmlFor="contestName">
                      Contest Name:
                    </label>

                    <input
                      onChange={handleChange}
                      className={classes.input}
                      {...register("contestName", {
                        required: "Contest name cannot be empty.",
                      })}
                      id="contestName"
                    />
                    {errors.contestName && (
                      <span className={classes.p}>
                        {errors.contestName.message}
                      </span>
                    )}

                    <label className={classes.label} htmlFor="Description">
                      Contest description:{" "}
                    </label>
                    <textarea
                      name="Description"
                      id="Description"
                      placeholder="Enter the description"
                      className={classes.input}
                      {...register("Description", {
                        required: "Description cannot be empty.",
                      })}
                    ></textarea>
                    <label className={classes.label} htmlFor="date">
                      Date:
                    </label>
                    <input
                      onChange={handleChange}
                      className={classes.input}
                      type="date"
                      data-date=""
                      data-date-format="DD MMMM YYYY"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("date", {
                        required: "Contest Date cannot be empty.",
                        valueAsDate: true,
                      })}
                    />
                    {errors.date && (
                      <span className={classes.p}>{errors.date.message}</span>
                    )}
                    <label className={classes.label} htmlFor="time">
                      Start Time:
                    </label>
                    <input
                      onChange={handleChange}
                      className={classes.input}
                      type="time"
                      {...register("time", {
                        required: true,
                        valueAsTime: true,
                      })}
                    />
                    <label className={classes.label} htmlFor="duration">
                      Duration(hrs)
                    </label>
                    <input
                      onChange={handleChange}
                      className={classes.input}
                      type="number"
                      step="0.5"
                      {...register("duration", {
                        required: "Contest Duration cannot be empty.",
                        valueAsNumber: true,
                      })}
                      id="duration"
                    />
                    {errors.duration && (
                      <span className={classes.p}>
                        {errors.duration.message}
                      </span>
                    )}
                    <FormControlLabel
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      control={
                        <Switch
                          checked={state.checkedB}
                          onChange={handleSwitchChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Public Contest"
                    />
                    <input
                      className={classes.submitButton}
                      value="Next"
                      type="submit"
                    />
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
            <Typography
              variant="h4"
              style={{
                color: "white",
              }}
            >
              Public Contests
            </Typography>

            <Contest data={contests} />
            <Typography
              variant="h4"
              style={{
                color: "white",
              }}
            >
              Invited Contests
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default ContestSpace;
