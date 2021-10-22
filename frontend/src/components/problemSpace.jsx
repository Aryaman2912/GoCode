import { useEffect, useState } from 'react';

import ReactLoading from 'react-loading';

import ProblemBox from './ProblemBox';


const ProblemSpace = () => {

    const [problems, setProblems] = useState([])
    const [loading, setLoading] = useState(true)

    const hasCache = (expireTime, cachedProblems) => {
        if(cachedProblems === null || expireTime === null || +new Date() > expireTime) return false
        return true
    }

    // Problems refresh every 5 minutes
    let MINUTES_TO_ADD = 5
    useEffect(() => {
        const cachedProblems = localStorage.getItem('problems')
        // console.log(cachedProblems)
        console.log(+new Date())
        const expireTime = localStorage.getItem('problemsExpirationTimestamp')
        if(!hasCache(expireTime, cachedProblems)) {
            fetch('http://localhost:5000/api/problems')
                .then((data) => data.json())
                .then(data => {
                    let tags = [];
                    data.forEach(problem => {
                        problem.tags.forEach(tag => {
                            tags.push(tag)
                            console.log(tag);
                        })
                    });
                    console.log(tags);
                    const uniqueTags = new Set(tags);
                    console.log(uniqueTags);
                    const finalData = {};
                    uniqueTags.forEach(t => {
                        finalData[t] = data.filter(d => {
                            return d.tags.indexOf(t) !== -1;
                        })
                    })
                    setProblems(finalData);
                    localStorage.setItem('problems', JSON.stringify(finalData));
                    let currentDate = new Date()
                    let expireTimeStamp = +new Date(currentDate.getTime() + MINUTES_TO_ADD*60000)
                    localStorage.setItem('problemsExpirationTimestamp', expireTimeStamp)
                    setLoading(false)

                })
        } else {
            setProblems(JSON.parse(cachedProblems))
            setLoading(false)
        }
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
