import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import EachPlaylist from "./eachPlaylist";

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

export default function Playlist({ data }) {
  console.log(data);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {data.map((t, i) => {
        // console.log(t);
        return (
          <>
            <EachPlaylist t={t}></EachPlaylist>
          </>
        );
      })}
    </div>
  );
}
