import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { CurrentUser } from "../../api/CurrentUser";

export default function ContestDeleteButton({ contest }) {
    const deleteContest = (contestId) => {
        // console.log(contestId);
        console.log(`http://localhost:5000/api/contests/${contestId}`);
        axios.delete(`http://localhost:5000/api/contests/${contestId}`)
        .then((res) => {
          if(res.status === 200) {
            alert("Contest Deleted Successfully");
            console.log(this);
          }
          else console.log(res);
        })
    }
    
    if(CurrentUser.result._id === contest.hostId) {
        return(
            <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ff4d4d",
                    padding: "0rem 2rem",
                    margin: "0rem 1rem"
                  }}
                  onClick={() => deleteContest(contest._id)}
                >
                  Delete
                </Button>
        );
    }
    else return(null);
}