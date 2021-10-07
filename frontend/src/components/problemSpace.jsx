import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar'
import ReactLoading from 'react-loading';

import ProblemBox from './ProblemBox';


const ProblemSpace = () => {

    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)



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
                Object.entries(problems).map((problem, i)=>{

                    // const indexOfLastPost = currentPage * postsPerPage;
                    //  const indexOfFirstPost = indexOfLastPost - postsPerPage;
                    // const currentPosts = problem[1].slice(indexOfFirstPost, indexOfLastPost);
                 
                    
                    // const paginate = () => setCurrentPage(currentPage+1);

                

                return  <ProblemBox  problemset={problem} i={i}/>
                }
            )
            }
        </>
    );
}

export default ProblemSpace;
