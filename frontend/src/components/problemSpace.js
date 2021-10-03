import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar'
import ReactLoading from 'react-loading';

const ProblemSpace = () => {
    
    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        fetch('http://localhost:5000/api/problems')
        .then((data) => data.json())
        .then(data => {
            setProblems(data);
            setLoading(false)
            console.log(data);
        })
    }, [])

    const problemURL = '/problem/';
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
                problems.map((problem, i) => {
                    return (<p key={i}>{problem.name} <Link to={problemURL + problem._id}>problem</Link></p>)
                })
            }
        </>
    );
}

export default ProblemSpace;