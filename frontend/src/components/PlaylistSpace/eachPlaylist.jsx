import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { Container, Row, Col } from "react-grid-system";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DescriptionIcon from "@material-ui/icons/Description";
import { domain, frontendDomain } from "../../constants/config";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EachPlaylist({ t }) {
  const [like, setLike] = useState(false);
  const [nlikes, setnlikes] = useState(t.likes);
  const [open, setOpen] = useState(false);

  console.log(t);

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
          Owner: {t.userId.name}
        </Typography>
      </Row>
      <Row
        style={{
          textTransform: "capitalize",
          margin: "1rem 0rem",
          color: "#C9C0BB",
        }}
      >
        <DescriptionIcon />
        <Typography
          variant="h7"
          style={{
            paddingLeft: "1rem",
            color: "#ADD8E6",
          }}
        >
          Description: {t.description}
        </Typography>
      </Row>
      {/* 
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
    </Row> */}
      {/* <Row
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
    </Row> */}
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
        <Button
          style={{
            color: "white",
            padding: "0rem 2rem ",
            borderColor: "white",
            margin: "0rem 1rem",
          }}
          variant="outlined"
          onClick={() => {
            navigator.clipboard
              .writeText(`${frontendDomain}/showplaylist/${t._id}`)
              .then(() => {
                alert("Copied link to clipboard");
              });
          }}
        >
          <Row>
            <ShareIcon />
            <Typography
              style={{
                paddingLeft: "0.5rem",
              }}
            >
              Share
            </Typography>
          </Row>
        </Button>

        <Button
          variant="contained"
          color="primary"
          href={"/showplaylist/" + t._id}
        >
          <Typography
            style={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          >
            Solve
          </Typography>
        </Button>
      </Row>
      <Row
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Col>
          <Button
            onClick={() => {
              setLike(!like);
              like ? setnlikes(nlikes - 1) : setnlikes(nlikes + 1);
            }}
          >
            {like ? (
              <FavoriteIcon
                style={{
                  color: "red",
                }}
                fontSize="large"
              ></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon
                style={{
                  color: "red",
                }}
                fontSize="large"
              ></FavoriteBorderIcon>
            )}
          </Button>
          <Typography
            style={{
              color: "white",
            }}
          >
            {nlikes} Likes
          </Typography>
        </Col>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          <InsertCommentIcon
            style={{
              color: "blue",
              size: "2rem",
              marginRight: "2rem",
              marginTop: "1rem",
            }}
            fontSize="large"
          ></InsertCommentIcon>
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="form-dialog-title"
          PaperProps={{
            style: {
              backgroundColor: "#F5F5F5",
              boxShadow: "none",
            },
          }}
        >
          <DialogTitle id="form-dialog-title">Comments</DialogTitle>
          <DialogContent
            style={{
              width: "35rem",
            }}
          >
            <DialogContentText>
              <textarea
                name="problemStatement"
                id="problemStatement"
                placeholder="Write your comment here..."
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid black",
                  padding: "10px 15px",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
                // className={classes.input}
                // {...register("problemStatement", {
                //   required: "Problem statement cannot be empty.",
                // })}
              ></textarea>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => {}} color="primary">
              Add Comment
            </Button>
          </DialogActions>
        </Dialog>
      </Row>
    </Paper>
  );
}
