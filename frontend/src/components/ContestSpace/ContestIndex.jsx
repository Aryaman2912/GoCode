import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import { DATE_OPTIONS } from "../../constants/dateOptions";
import ContestTimer from "./ContestTimer";
import { domain } from "../../constants/config";

const ContestIndex = (props) => {
    const [contestProblems, setContestProblems] = useState([]);
    const [contest, setContest] = useState({});
    const history = useHistory();
    useEffect(() => {
    //     axios
    //       .get("http://localhost:5000/api/contests/" + props.match.params.id)
    //       .then((res) => {
    //         console.log("##################");

    //         let cDetails = Object.entries(res)[0][1];

    //         let tcproblems = [];

    //         var pCount = 0;
    //         if (cDetails["problems"].length === 0) {
    //           setcontestProblems(tcproblems);
    //           setloadingProblemSubmit(false);
    //           setOpen(false);
    //         }
    //         cDetails["problems"].forEach((problemID) => {
    //           let problemURL = `http://localhost:5000/api/problems?problemID=${problemID}`;
    //           fetch(problemURL)
    //             .then((problem) => problem.json())
    //             .then((problem) => {
    //               tcproblems.push(problem);
    //               pCount++;
    //               if (pCount === cDetails["problems"].length) {
    //                 setcontestProblems(tcproblems);
    //                 setloadingProblemSubmit(false);
    //                 setOpen(false);
    //               }
    //             });
    //         });
    //       });
    //   })
    //   .catch((err) => console.log(err));
        axios
        .get(`${domain}/api/contests/` + props.match.params.id)
        .then((res) => {
            console.log("#############");
            console.log(res.data, "The contest is as above");
            setContest(res.data);
            let cDetails = Object.entries(res)[0][1];

            let tcproblems = [];

            var pCount = 0;

            if (cDetails["problems"].length === 0) {
                setContestProblems(tcproblems);
            }

            cDetails["problems"].forEach((problemID) => {
                let problemURL = `https://gocode-nitk.herokuapp.com/api/problems?problemID=${problemID}`;
                fetch(problemURL)
                .then((problem) => problem.json())
                .then((problem) => {
                    tcproblems.push(problem);
                    pCount++;
                    if (pCount === cDetails["problems"].length) {
                        setContestProblems(tcproblems);
                    }
                });
            });
        });

    }, []);

    return (
        <div>
            <ContestTimer contest={contest} />
        {contestProblems.map((problem, i) => {
        console.log(problem);
        return (
        <Paper
            style={{
            margin: "2rem",
            padding: "0.5rem 5rem",
            borderRadius: "2rem",
            }}
        >
            <Grid container>
            <Grid item xs={12}>
                <Link to={"/problem/" + problem._id}>
                <Typography variant="h5"> {problem.name}</Typography>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Typography component="span">Other Tags:</Typography>
                {problem.tags.map((p, i) => {
                return (
                    <Chip
                    size="small"
                    label={p}
                    key={i}
                    style={{
                        padding: "10px",
                        margin: "5px",
                    }}
                    />
                );
                })}
            </Grid>
            <Grid item xs={12}>
                <Typography component="span">Score:</Typography>
            </Grid>
            </Grid>
        </Paper>
        );
    })}
    </div>
    );
}

export default ContestIndex;