import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar'
import ReactLoading from 'react-loading';
import ProblemCard from './ProblemCard';
import { Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const ProblemSpace = () => {

    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetch('http://localhost:5000/api/problems')
            .then((data) => data.json())
            .then(data => {
                console.log('finalData');
                let tags = [];
                data.forEach(problem => {
                    problem.tags.forEach(tag => {
                        tags.push(tag)
                    })

                });

                const uniqueTags = new Set(tags);
                const finalData = {};
                uniqueTags.forEach(t => {
                    finalData[t] = data.filter(d => {
                        return d.tags.indexOf(t) != -1;
                    })


                })
                console.log(finalData);
                setProblems(finalData);
                setLoading(false)
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
            {loading ? <div style={{

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={100} width={100} /></div> :
                Object.entries(problems).map((problem, i) =>
                 <Paper style={
                     {
                         padding:'1rem',
                         backgroundColor:'#333333',
                         borderRadius:'2rem',
                         margin:'2rem 0',
                         

                        
                     }
                 } elevation='5' variant='outlined' >
                
                <Typography variant='h3' style={{
                    textAlign:'center',
                    textTransform:'capitalize',
                    color:'white'
                }}>{problem[0]}</Typography>
               {
                   problem[1].filter((item,i)=>i<=3).map((problem,i)=><ProblemCard  problem={problem} i={i}/>)
               }
               <div style={
                   {
                       display:'flex',
                       justifyContent:'center',
                       
                   }
               }>

               <Pagination count={10} color="primary" />

               </div>
              
                
            </Paper>
            )
            }
        </>
    );
}

export default ProblemSpace;
