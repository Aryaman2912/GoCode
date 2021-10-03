import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import MathJax from 'react-mathjax';
import MathJax from 'mathjax3-react';
import ReactLoading from 'react-loading';


const Problem = (props) => {
    
    const [problem, setProblem] = useState({})
    const [loading, setLoading] = useState(true)
    const [testcases, setTestcases] = useState([])
    // const { problem_id } = useParams();
    const problemURL = 'http://localhost:5000/api/problem?problemID=' + props.match.params.id
    // console.log(problemURL)
    useEffect( () => {
        fetch(problemURL)
        .then((data) => data.json())
        .then(data => {
            setProblem(data);
            setLoading(false);
            const tc = []
            for(let i = 0; i < data.input.length; i++) {
                console.log(data.input[i])
                tc.push([data.input[i], data.output[i]])
            }
            setTestcases(tc)
            console.log(data);
        })
    }, [])
    const loadingOptions = {
        type: "spin",
        color: "#347deb",
    }

    return (
        <>
            {/* TODO --------------------------------->>> Need to design and put tags and stuff */}
            {loading? <div style={{
                margin: "auto",
                textAlign: "center"
            }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={400} width={250} /></div>: 
            <>
                <h1>{problem.name}</h1><br></br>
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
                            inlineMath: [['$$$', '$$'], ['$$$', '$$$']]
                          }
                        }}
                >
                    <MathJax.Html html={problem.statement}/>
                </MathJax.Provider>
                <br></br><h3>Sample testcases</h3>
                <div>
                {testcases.map((testcase, i) => {
                    return (<>
                        <h5>Input</h5>
                        <p style={{whiteSpace: "pre-wrap"}}>{testcase[0]}</p><br></br>
                        <h5>Output</h5>
                        <p style={{whiteSpace: "pre-wrap"}}>{testcase[1]}</p><br></br><br></br>
                    </>
                    )
                })}
                </div>
            </>
            }
        </>
    );
}

export default Problem;