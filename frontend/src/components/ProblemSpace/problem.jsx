import React, { useEffect, useState } from "react";
import MathJax from "mathjax3-react";
import ReactLoading from "react-loading";
import {
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import "./problem.css";
import Editor from "../CodingSpace/Editor";
import { DropdownButton, Dropdown, Badge } from "react-bootstrap";
import { Container, Row, Col } from "react-grid-system";
import UserInputOutput from "../CodingSpace/UserInputOutput";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Problem = (props) => {
  const [problem, setProblem] = useState({});
  const [loading, setLoading] = useState(true);
  const [testcases, setTestcases] = useState([]);
  const [code, setCode] = useState("");
  const [codeMirrorMode, setCodeMirrorMode] = useState("clike");
  const [codeLanguage, setCodeLanguage] = useState("C++");
  const [userOutput, setuserOutput] = useState("");

  const history = useHistory();
  const [userInput, setUserInput] = useState("");
  const [submitLoad, setSubmitLoad] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const [open, setDialogOpen] = useState(false);
  const [TestLoad, setTestLoad] = useState(false);

  const languageOptions = {
    "C++": "clike",
    "Java": "clike",
    "C": "clike",
    "Python": "python",
  };

  const buttonHandlerIDE = (type) => {
    if (type === "submit") {
      setSubmitLoad(true);
    } else {
      setTestLoad(true);
    }
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
    axios
      .post(
        "http://localhost:5000/api/compile",
        {
          code: code,
          language: codeLanguage,
          userInput: userInput,
          problemID: problem._id,
          submissionType: type,
        },
        { headers: headers }
      )
      .then((res) => {
        if (Object.entries(res)[1][1] !== 200) {
          setDialogTitle("Error");
          setDialogContent("Your code could not be compiled.Please Try Later");
        } else if (type === "submit") {
          if (Object.entries(res)[0][1].Verdict === "Wrong answer") {
            setDialogTitle("Oops");
            setDialogContent("Thats not right, Please check your code again");
            setSubmitLoad(false);

            setDialogOpen(true);
          } else {
            setDialogTitle("Hooray");
            setDialogContent("Thats the Right Answer. You did it.");
            setSubmitLoad(false);

            setDialogOpen(true);
          }
        } else {
          setTestLoad(false);
        }
        setuserOutput(res.data.output);
      });
  };

  const problemID = props.match.params.id;
  useEffect(() => {
    let problemURL = `http://localhost:5000/api/problems?problemID=${problemID}`;
    fetch(problemURL)
      .then((data) => data.json())
      .then((data) => {
        setProblem(data);
        setLoading(false);
        const tc = [];
        for (let i = 0; i < data.input.length; i++) {
          // console.log(data.input[i])
          tc.push([data.input[i], data.output[i]]);
        }
        setTestcases(tc);
      });
    const localStorageCode = localStorage.getItem(`code_${problemID}`);
    if (localStorageCode !== null) {
      const jsonCode = JSON.parse(localStorageCode);
      setCode(jsonCode["code"]);
      setCodeMirrorMode(jsonCode["codeMirrorMode"]);
      setCodeLanguage(jsonCode["codeLanguage"]);
    }
  }, [problemID]);

  useEffect(() => {
    let localIDEData = {
      code: code,
      codeMirrorMode: codeMirrorMode,
      codeLanguage: codeLanguage,
    };
    localStorage.setItem(`code_${problemID}`, JSON.stringify(localIDEData));
  }, [code, codeMirrorMode, codeLanguage, problemID]);

  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
          <Container>
            <Row>
              <Col sm={6}>
                <Typography
                  variant="h3"
                  style={{
                    textAlign: "center",
                    textTransform: "capitalize",
                    color: "white",
                  }}
                >
                  {problem.name}
                </Typography>
                <br></br>
                <MathJax.Provider
                  url="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
                  options={{
                    tex: {
                      inlineMath: [
                        ["$$$", "$$$"],
                        ["$$$", "$$$"],
                      ],
                    },
                  }}
                >
                  <div className="class-div">
                    {" "}
                    <MathJax.Html html={problem.statement} />{" "}
                  </div>
                </MathJax.Provider>
                <br></br>
                <Typography
                  variant="h4"
                  style={{
                    color: "white",
                  }}
                >
                  Sample testcases
                </Typography>

                <div>
                  {testcases.map((testcase, i) => {
                    return (
                      <div>
                        <Typography variant="h6" style={{ color: "white" }}>
                          Input
                        </Typography>
                        <p style={{ whiteSpace: "pre-wrap", color: "white" }}>
                          {testcase[0]}
                        </p>
                        <br></br>
                        <Typography variant="h6" style={{ color: "white" }}>
                          Output
                        </Typography>
                        <p style={{ whiteSpace: "pre-wrap", color: "white" }}>
                          {testcase[1]}
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col sm={6}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link to={"/submissions/" + problemID}>
                    <Button
                      style={{
                        color: "white",
                        padding: "0.7rem ",
                        borderColor: "white",
                        marginLeft: "auto",
                        background: "#006633",
                      }}
                      variant="outlined"
                    >
                      My Submissions
                    </Button>
                  </Link>
                </div>
                <DropdownButton id="dropdown-basic-button" title={codeLanguage}>
                  {Object.keys(languageOptions).map((key, index) => {
                    return (
                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          setCodeMirrorMode(languageOptions[key]);
                          setCodeLanguage(key);
                        }}
                      >
                        {key}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <Editor
                  code={code}
                  languageMode={codeMirrorMode}
                  onChange={setCode}
                />
                {TestLoad ? (
                  <>
                    <CircularProgress color="secondary" size="1.5rem " />
                  </>
                ) : (
                  <>
                    <Button
                      style={{
                        color: "white",
                        padding: "0.3rem ",
                        // borderColor: "white",
                        marginLeft: "auto",
                        background: "#087afc",
                      }}
                      variant="outlined"
                      onClick={() => buttonHandlerIDE("test")}
                    >
                      Test
                    </Button>
                  </>
                )}
                {submitLoad ? (
                  <>
                    <CircularProgress color="secondary" size="2rem " />
                  </>
                ) : (
                  <>
                    <Button
                      style={{
                        color: "white",
                        padding: "0.3rem ",
                        // borderColor: "white",
                        marginLeft: "auto",
                        background: "#087afc",
                      }}
                      variant="outlined"
                      onClick={() => buttonHandlerIDE("submit")}
                    >
                      Submit
                    </Button>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          backgroundColor: "#424242",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        style={{
                          color: "white",
                        }}
                      >
                        {dialogTitle}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          style={{
                            color: "#bebec3",
                          }}
                        >
                          {dialogContent}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        {/* <Button onClick={handleDialogClose} color="primary">
                          Disagree
                        </Button> */}
                        <Button
                          onClick={handleDialogClose}
                          color="secondary"
                          autoFocus
                        >
                          Okay
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
                <br />
                <Badge bg="success">Input</Badge>
                <UserInputOutput
                  text={userInput}
                  onChange={setUserInput}
                  isInput={true}
                />
                <Badge bg="success">Output</Badge>
                <UserInputOutput text={userOutput} isInput={false} />
                {/* <Link to={"/submissions/" + problemID}>Submissions</Link> */}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Problem;
