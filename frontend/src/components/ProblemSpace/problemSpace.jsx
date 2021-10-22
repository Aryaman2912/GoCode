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
    const MINUTES_TO_ADD = 5

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
                        })
                    });
                    const uniqueTags = new Set(tags);
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
            {loading ? <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={100} width={100} /></div> :
                Object.entries(problems).map((problem, i)=>{
                    return  <ProblemBox  problemset={problem} key={i}/>
                }
            )
            }
        </>
    );
}

export default ProblemSpace;
