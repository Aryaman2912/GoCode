import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { Row } from "react-grid-system";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ContestDeleteButton from "./ContestDeleteButton";
import ContestParticipateButton from "./ContestParticipateButton";
import { DATE_OPTIONS } from "../../constants/dateOptions";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Contest({ data }) {
  var current_time = new Date().toISOString();
  const classes = useStyles();
  // const deleteContest = (contestId) => {
  //   // console.log(contestId);
  //   console.log(`http://localhost:5000/api/contests/${contestId}`);
  //   axios.delete(`http://localhost:5000/api/contests/${contestId}`)
  //   .then((res) => {
  //     if(res.status === 200) {
  //       alert("Contest Deleted Successfully");
  //       console.log(this);
  //     }
  //     else console.log(res);
  //   })
  // }

  return (
    <div className={classes.root}>
      {data.map((t, i) => {
        return (
          <>
            <Paper
              style={{
                padding: "1rem",
                backgroundColor: "#333333",
                borderRadius: "1rem",
                margin: "2rem 2rem",
                width: "auto",
                height: "auto",
              }}
              elevation={2}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  margin: "1rem 2rem",
                  color: "#F8fbf8",
                }}
              >
                {t.name}
              </Typography>
              <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: "#C9C0BB",
                }}
              >
                <PersonOutlineIcon />
                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",
                    color: "#ADD8E6",
                  }}
                >
                  Host: {t.Host}
                </Typography>
              </Row>

              <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: "#C9C0BB",
                }}
              >
                <AccessTimeIcon />

                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",

                    color: "#ADD8E6",
                  }}
                >
                  Duration: {t.Duration}
                </Typography>
              </Row>
              <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: " #C9C0BB",
                }}
              >
                <CalendarTodayIcon />
                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",

                    color: "#ADD8E6",
                  }}
                >
                  ON:{" "}
                  {new Date(t.Date).toLocaleDateString("en-US", DATE_OPTIONS)}
                </Typography>
              </Row>
              {/* <Button
           style={{
            display: 'flex',
            justifyContent: 'center',
            margin:'2rem 4rem'

           }}
            variant="contained" color="#3f51b5" disableElevation>
            Participate
            </Button> */}
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem ",
                }}
              >
                {current_time > new Date(t.Date).toISOString() ||
                JSON.parse(localStorage.getItem("profile"))["result"]["_id"] ===
                  t.hostId ? (
                  <Button
                    style={{
                      color: "white",
                      padding: "0rem 2rem ",
                      borderColor: "white",
                      margin: "0rem 1rem",
                    }}
                    variant="outlined"
                    href={"/contests/" + t._id}
                  >
                    INFO
                  </Button>
                ) : (
                  <Button
                    style={{
                      color: "white",
                      padding: "0rem 2rem ",
                      borderColor: "white",
                      margin: "0rem 1rem",
                    }}
                    variant="outlined"
                  >
                    INFO
                  </Button>
                )}

                <ContestParticipateButton contest={t} />
                {/* <Button
                  variant="contained"
                  color="primary"
                  href="#outlined-buttons"
                >
                  Participate
                </Button> */}

                <ContestDeleteButton contest={t} />
                {/* <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ff4d4d",
                    padding: "0rem 2rem",
                    margin: "0rem 1rem"
                  }}
                  onClick={() => deleteContest(t._id)}
                >
                  Delete
                </Button> */}
              </Row>
            </Paper>
          </>
        );
      })}
    </div>
  );
}
