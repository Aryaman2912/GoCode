import { useEffect, useState } from 'react';
import Sidebar from './sidebar'


const ProblemSpace = () => {
    
    const [problems, setProblems] = useState([])

    useEffect( () => {
        fetch('http://localhost:5000/api/problems')
        .then((data) => data.json())
        .then(data => {
            setProblems(data);
            console.log(data);
        })
    }, [])


    return (
        <div style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <Sidebar />
            
            {/* TODO --------------------------------->>> Need to design */}
            problemspace page
            {problems.map((problem, i) => {
                return (<p key={i}>{problem.name}</p>)
            })}
        </div>
    );
}

export default ProblemSpace;