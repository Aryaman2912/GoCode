import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import SubmissionCard from "./SubmissionCard";


const Submissions = (props) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const problemID = props.match.params.id

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    if (storage === null) {
      history.push("/auth");
      return;
    }
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    };
    fetch(
      `http://localhost:5000/api/submissions?problemID=${problemID}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((data) => data.json())
      .then((data) => {
        data.reverse()
        setSubmissions(data);
        setLoading(false);
      });
  }, [problemID, history]);

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
          <Typography
            variant="h5"
            style={{
              color: "white",
            }}
          >
            My Submissions
          </Typography>
          {submissions.map((submission, i) => {
            return (
              <SubmissionCard submission={submission} key={i}/>
            );
          })}
        </>
      )}
    </>
  );
};

export default Submissions;
