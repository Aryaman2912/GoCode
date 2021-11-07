import { Paper, Typography, Button } from "@material-ui/core";
import { React, useState } from "react";
import { Row } from "react-grid-system";
import { Collapse } from "react-collapse";
import ViewCode from "../CodingSpace/ViewCode";

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minutes: "numeric",
};


const LANGUAGE_MODE = {
  "cpp17": "clike",
  "python3": "python",
  "java": "clike",
  "c": "clike",
};

const SubmissionCard = ({ submission }) => {
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
            color: submission.verdict === "Wrong answer" ? "#AA4A44" : "green",
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
        </Row>
      </div>
      <Collapse isOpened={copen}>
        <div>
          <ViewCode
            code={submission.code}
            languageMode={LANGUAGE_MODE[submission.language]}
          />
        </div>
      </Collapse>
    </Paper>
  );
};

export default SubmissionCard;
