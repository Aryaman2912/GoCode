import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import ViewCode from "../CodingSpace/ViewCode";

const RESOLVER = {
  cpp17: "clike",
  python3: "python",
  java: "clike",
  c: "clike",
};

const Submissions = (props) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
      `http://localhost:5000/api/submissions?problemID=${props.match.params.id}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data);
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };
  return (
    <>
      {submissions.map((submission) => {
        return (
          <div>
            <h3>{submission.problemID}</h3>
            <p>{submission.verdict}</p>
            <p>{submission.timeStamp}</p>
            <ViewCode
              code={submission.code}
              languageMode={RESOLVER[submission.language]}
            />
          </div>
        );
      })}
    </>
  );
};

export default Submissions;
