import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function ContestParticipateButton({ contest }) {
  const [canParticipate, setCanParticipate] = useState(false);
  const [canEnroll, setCanEnroll] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contests/${contest._id}/is_valid`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          if (res.data.message === "Valid") setCanParticipate(true);
          else if (res.data.message === "Enroll") setCanEnroll(true);
          else {
            setCanParticipate(false);
            setCanEnroll(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (canParticipate) {
    return (
      <Button
        variant="contained"
        color="primary"
        href={"/contests/" + contest._id + "/index"}
      >
        Participate
      </Button>
    );
  } else if (canEnroll) {
    return (
      <Button variant="contained" color="primary" href="#outlined-buttons">
        Enroll
      </Button>
    );
  } else return null;
}
