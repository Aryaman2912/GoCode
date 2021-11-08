import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { domain } from "../../constants/config";
import { useHistory } from "react-router";

export default function ContestParticipateButton({ contest }) {
  const [canParticipate, setCanParticipate] = useState(false);
  const [canEnroll, setCanEnroll] = useState(false);
  const history = useHistory()
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    // console.log(storage)
    if (storage === null) {
      history.push("/auth");
      return;
    }
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    axios
      .get(`${domain}/api/contests/${contest._id}/is_valid`, {headers: headers})
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
    useEffect(() => {
      const storage = JSON.parse(localStorage.getItem("profile"));
      // console.log(storage)
      if (storage === null) {
        history.push("/auth");
        return;
      }
      let token = storage.token;
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      };
        axios.get(`${domain}/api/contests/${contest._id}/is_valid`, {headers: headers})
        .then((res) => {
            if(res.status === 200) {
                console.log(res.data.message);
                if(res.data.message === "Valid") setCanParticipate(true);
                else setCanParticipate(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })

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
