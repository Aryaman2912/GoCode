import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import MathJax from 'react-mathjax';
import MathJax from 'mathjax3-react';
import ReactLoading from 'react-loading';
import { Typography } from '@material-ui/core';
import './problem.css'
import Editor from './Editor'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../api/index';

const Problem = (props) => {

    const [problem, setProblem] = useState({})
    const [loading, setLoading] = useState(true)
    const [testcases, setTestcases] = useState([])
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('')
    const [output, setOutput] = useState('')

    const languageOptions = {
        "cpp": "clike",
        "java": "clike",
        "c": "clike",
        "javascript": "javascript",
        "pyton": "python"
    }

    const arr = [
        "cpp", "clike",
        "java", "clike",
        "c", "clike",
        "javascript", "javascript",
        "pyton", "python"
    ]

    const handleProblemSubmit = () => {
        API.post('/compile/submit', {"code": code, "language": language})
        .then( (res) => {
            console.log(res);
        })
    }



    const problemURL = 'http://localhost:5000/api/problem?problemID=' + props.match.params.id
    // console.log(problemURL)
    useEffect(() => {
        fetch(problemURL)
            .then((data) => data.json())
            .then(data => {
                setProblem(data);
                setLoading(false);
                const tc = []
                for (let i = 0; i < data.input.length; i++) {
                    // console.log(data.input[i])
                    tc.push([data.input[i], data.output[i]])
                }
                setTestcases(tc)
                // console.log(data);
            })
    }, [])
    const loadingOptions = {
        type: "spin",
        color: "#347deb",
    }

    return (
        <>
            {/* TODO --------------------------------->>> Need to design and put tags and stuff */}
            {loading ? <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'

            }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={100} width={100} /></div> :
                <>
                    <Typography variant='h3' style={{
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        color: 'white'
                    }}>{problem.name}</Typography><br></br>
                    {/* works but all comes on a single line react-mathjax(package) and need to mention \text{} explicitly to avoid spaces removal*/}
                    {/* <MathJax.Provider>
                    <p>
                        <MathJax.Node formula={problem.statement} />
                    </p>
                </MathJax.Provider> */}

                    <MathJax.Provider
                        url="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
                        options={{
                            tex: {
                                inlineMath: [['$$$', '$$$'], ['$$$', '$$$']]
                            }
                        }}
                    >

                    <div className='class-div'> <MathJax.Html html={problem.statement} /> </div>
                    </MathJax.Provider>
                    <br></br>
                    <Typography variant='h4' style={{
                        color: 'white'
                    }}>Sample testcases</Typography>

                    <div>
                        {testcases.map((testcase, i) => {
                            return (<>
                                <Typography variant='h6' style={{

                                    color: 'white'
                                }}>Input</Typography>

                                <p style={{ whiteSpace: "pre-wrap", color: 'white' }}>{testcase[0]}</p><br></br>
                                <Typography variant='h6' style={{

                                    color: 'white'
                                }}>Output</Typography>
                                <p style={{ whiteSpace: "pre-wrap", color: 'white' }}>{testcase[1]}</p><br></br><br></br>
                            </>
                            )
                        })}
                    </div>
                    <DropdownButton id="dropdown-basic-button" title="Language">
                        {Object.keys(languageOptions).map( (key, index) => {
                            return (<Dropdown.Item href='#' onClick={() => setLanguage(languageOptions[key])}>{key}</Dropdown.Item>)
                        })}
                    </DropdownButton>
                    <Editor code={code} language={language} onChange={setCode} handleSubmit={handleProblemSubmit}/>
                </>
            }
        </>
    );
}

export default Problem;