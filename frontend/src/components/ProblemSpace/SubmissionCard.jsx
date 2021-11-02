import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { React, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import { Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import ViewCode from "../CodingSpace/ViewCode";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minutes: "numeric",
};
const RESOLVER = {
  "C++": "cpp17",
  Python: "python3",
  Java: "java",
  C: "c",
};

const SubmissionCard = ({ submission }) => {
  console.log(submission);
  console.log(submission.problemID);
  const [copen, setcopen] = useState(false);

  const handleClickOpen = () => {
    setcopen(!copen);
  };
  return (
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
      {/* <Link to={problemURL + problem._id}>  */}
      <Typography
        variant="h6"
        style={{
          color: "white",
        }}
      >
        {submission._id}
      </Typography>
      {/* </Link> */}

      <Row
        style={{
          padding: "1rem 1rem 0rem 1rem",
        }}
      >
        <Typography
          variant="h7"
          style={{
            color: "white",
            // fontWeight: "bold",
          }}
        >
          Verdict:
        </Typography>
        <Typography
          variant="h7"
          style={{
            color: submission.verdict == "Wrong answer" ? "#AA4A44" : "green",
            fontWeight: "bold",
            paddingLeft: "0.5rem",
          }}
        >
          {submission.verdict}
        </Typography>
      </Row>

      <Row
        style={{
          padding: "1rem 1rem 0rem 1rem",
        }}
      >
        <Typography
          variant="h7"
          style={{
            color: "white",
            // fontWeight: "bold",
          }}
        >
          Submitted on:
        </Typography>
        <Typography
          variant="h7"
          style={{
            color: "white",
            fontWeight: "bold",
            paddingLeft: "0.5rem",
          }}
        >
          {new Date(submission.timeStamp).toLocaleDateString(
            "en-US",
            DATE_OPTIONS
          )}
        </Typography>
      </Row>
      <Row
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h7"
          style={{
            color: "white",
            // fontWeight: "bold",
          }}
        >
          Language:
        </Typography>
        <Typography
          variant="h7"
          style={{
            color: "white",
            fontWeight: "bold",
            paddingLeft: "0.5rem",
          }}
        >
          {submission.language}
        </Typography>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Row>
          <Button
            style={{
              color: "white",
              padding: "0rem 2rem ",
              borderColor: "white",
              margin: "0rem 1rem",
            }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            {copen ? "Close" : "View Code"}
          </Button>
          {/* <DeleteForeverIcon
            style={{
              color: "white",
              paddingRight: "1rem",
              fontSize: "3rem",
            }}
          ></DeleteForeverIcon> */}
        </Row>
      </div>

      {/* <Grid item xs={12}>
                        <Typography component='span' >
                            Other Tags: 
                        </Typography>
                    {
                        problem.tags.map((p, i)=>{
                            return <Chip size="small" label={p} key={i} style={{
                                padding:'10px',
                                margin:'5px',
                            }}/>
                        })
                    }
                    </Grid> */}
      <Collapse isOpened={copen}>
        <div>
          <ViewCode
            code={submission.code}
            languageMode={RESOLVER[submission.language]}
          />
        </div>
      </Collapse>
    </Paper>
  );
};

export default SubmissionCard;
