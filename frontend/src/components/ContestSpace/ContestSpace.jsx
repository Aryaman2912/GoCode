import {useEffect, useState} from 'react'
import { Typography } from '@material-ui/core';
import ReactLoading from 'react-loading';
import Contest from './Contest';

const ContestSpace = () => {

    const [contests, setContests] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/api/contests')
        .then((data) => data.json())
        .then(data => {
            let tempcontests = [];
            data.forEach(contest => {
                if (contest.isPublic) {
                    tempcontests.push(contest);
                }
            });
          setContests(tempcontests);
            setLoading(false);
        });
        
    }, [])

    console.log(contests);

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
          <>
     
        <div>
            <Typography
           variant='h4' style={{
           
            color: 'white'}}
            >
              Public Contests
            </Typography>
            <Contest  data={contests}/>
        </div>
        </>
         }
         </>

    );
         
}

export default ContestSpace;
